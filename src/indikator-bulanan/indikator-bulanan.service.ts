import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const WARNA_BY_KATEGORI: Record<string, string> = {
  Ekonomi: 'hijau',
  Sosial: 'oranye',
  Pendidikan: 'ungu',
  Kesehatan: 'merah',
  Ketenagakerjaan: 'kuning',
  Pertanian: 'hijau',
};

function formatNilai(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toFixed(2)).toString();
}

@Injectable()
export class IndikatorBulananService {
  constructor(private prisma: PrismaService) {}

  findAll(bulan?: number, tahun?: number) {
    const where: any = { aktif: true };
    if (bulan) where.bulan = bulan;
    if (tahun) where.tahun = tahun;
    return this.prisma.indikatorBulanan.findMany({ where, orderBy: { urutan: 'asc' } });
  }

  findAllAdmin() {
    return this.prisma.indikatorBulanan.findMany({ orderBy: [{ tahun: 'desc' }, { bulan: 'desc' }, { urutan: 'asc' }] });
  }

  async findStrategisYears(): Promise<number[]> {
    const rows = await this.prisma.dataPoint.findMany({
      where: { daerah: 'Toli-Toli' },
      select: { tahun: true },
      distinct: ['tahun'],
      orderBy: { tahun: 'desc' },
    });
    return rows.map((r) => r.tahun);
  }

  async findCombined(bulan?: number, tahun?: number) {
    // 1. Get manual entries for this period
    const manual = await this.findAll(bulan, tahun);

    if (!tahun) {
      return manual.map((m) => ({ ...m, sumber: 'manual' as const }));
    }

    // 2. Get all active indikator strategis with DataPoints for this year and previous
    const indikators = await this.prisma.indikator.findMany({
      where: { aktif: true },
      include: {
        data: {
          where: {
            daerah: 'Toli-Toli',
            tahun: { in: [tahun, tahun - 1] },
          },
        },
      },
      orderBy: [{ kategori: 'asc' }, { nama: 'asc' }],
    });

    // 3. Build auto entries from strategis
    const autoEntries: any[] = [];
    let autoUrutan = 1000;

    for (const ind of indikators) {
      // Primary value: prefer kolom='nilai', fallback to first available
      const currPoint =
        ind.data.find((d) => d.tahun === tahun && d.kolom === 'nilai') ??
        ind.data.find((d) => d.tahun === tahun);
      if (!currPoint) continue;

      const prevPoint =
        ind.data.find((d) => d.tahun === tahun - 1 && d.kolom === currPoint.kolom) ??
        ind.data.find((d) => d.tahun === tahun - 1);

      let perubahan: string | undefined;
      let arahPerubahan: string | undefined;
      let keterangan: string | undefined;

      if (prevPoint) {
        const diff = currPoint.nilai - prevPoint.nilai;
        arahPerubahan = diff > 0 ? 'naik' : diff < 0 ? 'turun' : 'tetap';
        const sign = diff >= 0 ? '+' : '';
        perubahan = `${sign}${formatNilai(diff)} ${ind.satuan}`;
        keterangan = `vs ${tahun - 1}: ${formatNilai(prevPoint.nilai)} ${ind.satuan}`;
      } else {
        keterangan = `Data tahun ${tahun}`;
      }

      autoEntries.push({
        id: -(ind.id),
        judul: ind.nama,
        nilai: formatNilai(currPoint.nilai),
        satuan: ind.satuan,
        perubahan,
        arahPerubahan,
        keterangan,
        periode: undefined,
        warna: WARNA_BY_KATEGORI[ind.kategori] ?? 'biru',
        urutan: autoUrutan++,
        bulan: bulan ?? new Date().getMonth() + 1,
        tahun,
        aktif: true,
        sumber: 'strategis' as const,
      });
    }

    // 4. Manual entries override auto if same judul (case-insensitive)
    const manualJuduls = new Set(manual.map((m) => m.judul.trim().toLowerCase()));
    const filteredAuto = autoEntries.filter(
      (a) => !manualJuduls.has(a.judul.trim().toLowerCase()),
    );

    return [
      ...manual.map((m) => ({ ...m, sumber: 'manual' as const })),
      ...filteredAuto,
    ];
  }

  create(data: any) {
    return this.prisma.indikatorBulanan.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.indikatorBulanan.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.indikatorBulanan.delete({ where: { id } });
  }
}
