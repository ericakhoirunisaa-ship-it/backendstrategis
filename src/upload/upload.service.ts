import { Injectable, BadRequestException } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { readFileSync, unlinkSync } from 'fs';
import { IndikatorService } from '../indikator/indikator.service';

// Kolom yang bukan data nilai (dilewati saat deteksi kolom numerik)
const NON_VALUE_COLS = new Set(['tahun', 'daerah', 'keterangan', 'catatan', 'kecamatan', 'kabupaten']);

@Injectable()
export class UploadService {
  constructor(private indikatorService: IndikatorService) {}

  async parseAndPreview(filePath: string): Promise<{ headers: string[]; rows: any[]; totalRows: number }> {
    const content = readFileSync(filePath, 'utf-8');
    let records: any[];
    try {
      records = parse(content, { columns: true, skip_empty_lines: true, trim: true, bom: true });
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

  async importCsv(filePath: string, indikatorId: number, kolomNilai?: string): Promise<{ inserted: number; errors: string[] }> {
    const content = readFileSync(filePath, 'utf-8');
    let records: any[];
    try {
      records = parse(content, { columns: true, skip_empty_lines: true, trim: true, bom: true });
    } catch (e: any) {
      try { unlinkSync(filePath); } catch {}
      throw new BadRequestException(`Format CSV tidak valid: ${e.message}`);
    }

    if (!records.length) {
      try { unlinkSync(filePath); } catch {}
      throw new BadRequestException('File CSV kosong');
    }

    const headers = Object.keys(records[0]);

    // Wajib ada kolom 'tahun'
    if (!headers.includes('tahun')) {
      try { unlinkSync(filePath); } catch {}
      throw new BadRequestException("CSV harus memiliki kolom 'tahun'");
    }

    // Deteksi kolom nilai: semua kolom selain NON_VALUE_COLS
    // Jika kolomNilai dikirim, hanya pakai kolom itu
    const valueCols = kolomNilai
      ? [kolomNilai]
      : headers.filter(h => !NON_VALUE_COLS.has(h.toLowerCase()));

    if (valueCols.length === 0) {
      try { unlinkSync(filePath); } catch {}
      throw new BadRequestException('Tidak ada kolom nilai yang ditemukan. Pastikan CSV memiliki kolom data selain tahun dan daerah.');
    }

    const errors: string[] = [];
    const points: Array<{ tahun: number; daerah?: string; kolom?: string; nilai: number }> = [];

    for (let i = 0; i < records.length; i++) {
      const row = records[i];
      const rowNum = i + 2;

      // Normalisasi tahun (bisa pakai koma atau titik sebagai pemisah ribuan)
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
        // Normalisasi angka: hapus titik pemisah ribuan, ganti koma desimal → titik
        const normalized = String(raw).replace(/\./g, '').replace(',', '.').trim();
        const nilai = parseFloat(normalized);
        if (isNaN(nilai)) continue;
        points.push({ tahun, daerah, kolom: col, nilai });
        hasValue = true;
      }

      if (!hasValue) {
        errors.push(`Baris ${rowNum}: tidak ada nilai numerik yang valid`);
      }
    }

    try { unlinkSync(filePath); } catch {}

    if (!points.length) {
      throw new BadRequestException(
        'Tidak ada data valid yang bisa diimpor. ' +
        'Pastikan format CSV: kolom pertama "tahun", kolom berikutnya nama nilai (mis: nilai, pertumbuhan_ekonomi, ipm, dll).'
      );
    }

    const result = await this.indikatorService.bulkUpsertDataPoints(indikatorId, points);
    return { inserted: result.inserted, errors };
  }
}
