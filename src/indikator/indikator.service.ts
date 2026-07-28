import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Injectable()
export class IndikatorService {
  constructor(private prisma: PrismaService) {}

  findAll(filters?: { search?: string; kategori?: string }) {
    const where: any = { aktif: true };

    if (filters?.search) {
      where.OR = [
        { nama: { contains: filters.search } },
        { kategori: { contains: filters.search } },
        { deskripsi: { contains: filters.search } },
      ];
    }

    if (filters?.kategori) {
      where.kategori = { contains: filters.kategori };
    }

    return this.prisma.indikator.findMany({
      where,
      orderBy: { nama: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const ind = await this.prisma.indikator.findUnique({
      where: { slug },
      include: {
        data: { orderBy: [{ tahun: 'asc' }, { daerah: 'asc' }] },
      },
    });
    if (!ind) throw new NotFoundException(`Indikator '${slug}' tidak ditemukan`);
    return ind;
  }

  async create(data: { nama: string; slug?: string; satuan: string; kategori?: string; tipeChart?: string; deskripsi?: string; definisi?: string; metodologi?: string; sumberData?: string; interpretasi?: string }) {
    const base = data.slug || slugify(data.nama);
    let slug = base;
    let counter = 1;
    while (await this.prisma.indikator.findUnique({ where: { slug } })) {
      slug = `${base}-${counter++}`;
    }
    return this.prisma.indikator.create({ data: { ...data, slug } });
  }

  async update(id: number, data: { nama?: string; satuan?: string; kategori?: string; tipeChart?: string; deskripsi?: string; definisi?: string; metodologi?: string; sumberData?: string; interpretasi?: string; aktif?: boolean; filterTahun?: boolean; filterDaerah?: boolean; filterKolom?: boolean }) {
    const existing = await this.prisma.indikator.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Indikator #${id} tidak ditemukan`);
    return this.prisma.indikator.update({ where: { id }, data });
  }

  async remove(id: number) {
    const existing = await this.prisma.indikator.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Indikator #${id} tidak ditemukan`);
    return this.prisma.indikator.delete({ where: { id } });
  }

  async addDataPoint(indikatorId: number, point: { tahun: number; daerah?: string; kolom?: string; nilai: number; keterangan?: string }) {
    const existing = await this.prisma.indikator.findUnique({ where: { id: indikatorId } });
    if (!existing) throw new NotFoundException(`Indikator #${indikatorId} tidak ditemukan`);
    return this.prisma.dataPoint.upsert({
      where: {
        tahun_daerah_kolom_indikatorId: {
          tahun: point.tahun,
          daerah: point.daerah || 'Toli-Toli',
          kolom: point.kolom || 'nilai',
          indikatorId,
        },
      },
      update: { nilai: point.nilai, keterangan: point.keterangan },
      create: {
        tahun: point.tahun,
        daerah: point.daerah || 'Toli-Toli',
        kolom: point.kolom || 'nilai',
        nilai: point.nilai,
        keterangan: point.keterangan,
        indikatorId,
      },
    });
  }

  async updateDataPointKeterangan(id: number, keterangan: string | null) {
    return this.prisma.dataPoint.update({ where: { id }, data: { keterangan } });
  }

  async bulkUpsertDataPoints(indikatorId: number, points: Array<{ tahun: number; daerah?: string; kolom?: string; nilai: number; keterangan?: string }>) {
    const results: any[] = [];
    for (const p of points) {
      const r = await this.addDataPoint(indikatorId, p);
      results.push(r);
    }
    return { inserted: results.length };
  }
}
