import { Injectable, BadRequestException } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { readFileSync, unlinkSync } from 'fs';
import { IndikatorService } from '../indikator/indikator.service';

const NON_VALUE_COLS = new Set(['tahun', 'daerah', 'keterangan', 'catatan', 'kecamatan', 'kabupaten']);

// ── Wide-format helpers ────────────────────────────────────────────────────────

function isYearLike(header: string): boolean {
  return /^\d{4}\*{0,2}$/.test(header.trim());
}

function extractYear(header: string): number {
  return parseInt(header.replace(/\*/g, '').trim(), 10);
}

// "M,N" → "MN", "R,S,T,U" → "RSTU", "—"/"-" → "PDRB"
function normalizeKode(kode: string): string {
  const k = kode.trim();
  if (k === '—' || k === '-') return 'PDRB';
  return k.replace(/[,\s]/g, '');
}

// "7 -12" → "7-12", "19 - 24" → "19-24"
function normalizeKolom(col: string): string {
  return col.replace(/\s*-\s*/g, '-').replace(/\s+/g, ' ').trim();
}

// Pengeluaran Indonesian name → short kode
const PENGELUARAN_NAME_MAP: Record<string, string> = {
  'Pengeluaran Konsumsi Rumah Tangga': 'RT',
  'Pengeluaran Konsumsi LNPRT': 'LNPRT',
  'Pengeluaran Konsumsi Pemerintah': 'GOV',
  'Pembentukan Modal Tetap Bruto': 'PMTB',
  'Perubahan Inventori': 'INV',
  'Net Ekspor Barang dan Jasa': 'EXPO',
  'Produk Domestik Regional Bruto': 'PDRB',
};

function resolveNameToKode(name: string): string {
  const indoPart = name.split(' / ')[0].trim();
  return PENGELUARAN_NAME_MAP[indoPart] || indoPart;
}

function tryParse(content: string, fromLine?: number): any[] {
  const opts: any = { columns: true, skip_empty_lines: true, trim: true, bom: true };
  if (fromLine) opts.from_line = fromLine;
  return parse(content, opts);
}

// ── Service ───────────────────────────────────────────────────────────────────

@Injectable()
export class UploadService {
  constructor(private indikatorService: IndikatorService) {}

  async parseAndPreview(filePath: string): Promise<{ headers: string[]; rows: any[]; totalRows: number }> {
    const content = readFileSync(filePath, 'utf-8');
    let records: any[];
    try {
      records = tryParse(content);
      records = autoSkipDescriptionRow(content, records);
    } catch (e: any) {
      try { unlinkSync(filePath); } catch {}
      throw new BadRequestException(`Format CSV tidak valid: ${e.message}`);
    }

    if (!records.length) {
      try { unlinkSync(filePath); } catch {}
      throw new BadRequestException('File CSV kosong');
    }

    const headers = Object.keys(records[0]);
    const rows = records.slice(0, 10);
    try { unlinkSync(filePath); } catch {}
    return { headers, rows, totalRows: records.length };
  }

  async importCsv(
    filePath: string,
    indikatorId: number,
    kolomNilai?: string,
    replace = false,
  ): Promise<{ inserted: number; errors: string[] }> {
    const content = readFileSync(filePath, 'utf-8');
    let records: any[];
    try {
      records = tryParse(content);
      records = autoSkipDescriptionRow(content, records);
    } catch (e: any) {
      try { unlinkSync(filePath); } catch {}
      throw new BadRequestException(`Format CSV tidak valid: ${e.message}`);
    }

    if (!records.length) {
      try { unlinkSync(filePath); } catch {}
      throw new BadRequestException('File CSV kosong');
    }

    const headers = Object.keys(records[0]);
    const yearCols = headers.filter(h => isYearLike(h));
    const isWideFormat = yearCols.length >= 2;

    const errors: string[] = [];
    const points: Array<{ tahun: number; daerah?: string; kolom?: string; nilai: number }> = [];

    if (isWideFormat) {
      // ── Wide format: years as columns (ekonomi PDRB files) ────────────────
      const kodeColName = headers.find(h => /^(kode|no|id)$/i.test(h.trim()));
      const firstCol = headers[0];

      for (let i = 0; i < records.length; i++) {
        const row = records[i];
        const rowNum = i + 2;

        let daerah: string;
        if (kodeColName) {
          daerah = normalizeKode(String(row[kodeColName] || '').trim());
        } else {
          daerah = resolveNameToKode(String(row[firstCol] || '').trim());
        }

        if (!daerah) {
          errors.push(`Baris ${rowNum}: tidak ada kode/nama yang valid`);
          continue;
        }

        let hasValue = false;
        for (const yearCol of yearCols) {
          const tahun = extractYear(yearCol);
          const raw = row[yearCol];
          if (raw === '' || raw === null || raw === undefined) continue;
          const normalized = String(raw).replace(/\./g, '').replace(',', '.').trim();
          const nilai = parseFloat(normalized);
          if (isNaN(nilai)) continue;
          points.push({ tahun, daerah, kolom: 'nilai', nilai });
          hasValue = true;
        }

        if (!hasValue) {
          errors.push(`Baris ${rowNum}: tidak ada nilai numerik yang valid`);
        }
      }
    } else {
      // ── Long format: tahun as rows (pendidikan + semua indikator lain) ────
      if (!headers.includes('tahun')) {
        try { unlinkSync(filePath); } catch {}
        throw new BadRequestException(
          "CSV harus memiliki kolom 'tahun' atau kolom tahun (2021, 2022, 2023, ...)",
        );
      }

      const valueCols = kolomNilai
        ? [kolomNilai]
        : headers.filter(h => !NON_VALUE_COLS.has(h.toLowerCase()));

      if (valueCols.length === 0) {
        try { unlinkSync(filePath); } catch {}
        throw new BadRequestException(
          'Tidak ada kolom nilai yang ditemukan. Pastikan CSV memiliki kolom data selain tahun dan daerah.',
        );
      }

      for (let i = 0; i < records.length; i++) {
        const row = records[i];
        const rowNum = i + 2;

        const rawTahun = String(row['tahun'] || '').replace(/[.,]/g, '').trim();
        const tahun = parseInt(rawTahun);
        if (isNaN(tahun) || tahun < 1900 || tahun > 2100) {
          errors.push(`Baris ${rowNum}: kolom 'tahun' tidak valid ("${row['tahun']}")`);
          continue;
        }

        const daerah = (row['daerah'] || row['kecamatan'] || row['kabupaten'] || 'Toli-Toli').trim();

        let hasValue = false;
        for (const col of valueCols) {
          const raw = row[col];
          if (raw === '' || raw === null || raw === undefined) continue;
          const normalized = String(raw).replace(/\./g, '').replace(',', '.').trim();
          const nilai = parseFloat(normalized);
          if (isNaN(nilai)) continue;
          // Normalize kolom name: "7 -12" → "7-12", "19 - 24" → "19-24"
          points.push({ tahun, daerah, kolom: normalizeKolom(col), nilai });
          hasValue = true;
        }

        if (!hasValue) {
          errors.push(`Baris ${rowNum}: tidak ada nilai numerik yang valid`);
        }
      }
    }

    try { unlinkSync(filePath); } catch {}

    if (!points.length) {
      throw new BadRequestException(
        'Tidak ada data valid yang bisa diimpor.',
      );
    }

    if (replace) {
      await this.indikatorService.clearData(indikatorId);
    }

    const result = await this.indikatorService.bulkUpsertDataPoints(indikatorId, points);
    return { inserted: result.inserted, errors };
  }
}

// If first-row headers have no year cols and no 'tahun', try skipping it
// (handles files like ADHK that have a description row above the real header)
function autoSkipDescriptionRow(content: string, records: any[]): any[] {
  if (!records.length) return records;
  const headers = Object.keys(records[0]);
  const hasYears = headers.some(h => isYearLike(h));
  const hasTahun = headers.includes('tahun');
  if (!hasYears && !hasTahun && records.length > 1) {
    try {
      return tryParse(content, 2);
    } catch {
      return records;
    }
  }
  return records;
}
