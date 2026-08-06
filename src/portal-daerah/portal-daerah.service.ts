import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortalDaerahService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, dinas?: string, topik?: string) {
    const datasets = await this.prisma.portalDaerahDataset.findMany({
      where: {
        aktif: true,
        ...(dinas ? { dinas } : {}),
        ...(topik ? { topik } : {}),
        ...(search
          ? {
              OR: [
                { judul: { contains: search } },
                { dinas: { contains: search } },
                { bidang: { contains: search } },
              ],
            }
          : {}),
      },
      include: { _count: { select: { rows: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return datasets;
  }

  async findAllAdmin() {
    return this.prisma.portalDaerahDataset.findMany({
      include: { _count: { select: { rows: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const dataset = await this.prisma.portalDaerahDataset.findUnique({
      where: { id },
      include: { rows: { orderBy: { urutan: 'asc' } } },
    });
    if (!dataset) throw new NotFoundException(`Dataset #${id} tidak ditemukan`);
    return dataset;
  }

  async incrementView(id: number) {
    const existing = await this.prisma.portalDaerahDataset.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Dataset #${id} tidak ditemukan`);
    await this.prisma.portalDaerahDataset.update({
      where: { id },
      data: { dilihat: { increment: 1 } },
    });
    return { ok: true };
  }

  async create(dto: {
    judul: string;
    dinas: string;
    bidang: string;
    topik: string;
    tahunMulai: number;
    tahunAkhir: number;
    deskripsi?: string;
    tanggalUpdate: string;
    icon?: string;
    iconBg?: string;
    iconColor?: string;
    columns: string[];
    rows?: Record<string, string | number>[];
  }) {
    const { rows, columns, ...meta } = dto;
    return this.prisma.$transaction(async (tx) => {
      const dataset = await tx.portalDaerahDataset.create({
        data: { ...meta, columns: columns as unknown as string[] },
      });
      if (rows && rows.length > 0) {
        await tx.portalDaerahRow.createMany({
          data: rows.map((r, i) => ({
            datasetId: dataset.id,
            data: r as unknown as object,
            urutan: i,
          })),
        });
      }
      return dataset;
    });
  }

  async update(
    id: number,
    dto: {
      judul?: string;
      dinas?: string;
      bidang?: string;
      topik?: string;
      tahunMulai?: number;
      tahunAkhir?: number;
      deskripsi?: string;
      tanggalUpdate?: string;
      icon?: string;
      iconBg?: string;
      iconColor?: string;
      aktif?: boolean;
    },
  ) {
    const existing = await this.prisma.portalDaerahDataset.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Dataset #${id} tidak ditemukan`);
    return this.prisma.portalDaerahDataset.update({ where: { id }, data: dto });
  }

  async replaceRows(id: number, columns: string[], rows: Record<string, string | number>[]) {
    const existing = await this.prisma.portalDaerahDataset.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Dataset #${id} tidak ditemukan`);
    return this.prisma.$transaction(async (tx) => {
      await tx.portalDaerahRow.deleteMany({ where: { datasetId: id } });
      await tx.portalDaerahDataset.update({
        where: { id },
        data: { columns: columns as unknown as string[], tanggalUpdate: existing.tanggalUpdate },
      });
      if (rows.length > 0) {
        await tx.portalDaerahRow.createMany({
          data: rows.map((r, i) => ({
            datasetId: id,
            data: r as unknown as object,
            urutan: i,
          })),
        });
      }
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.portalDaerahDataset.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Dataset #${id} tidak ditemukan`);
    return this.prisma.portalDaerahDataset.delete({ where: { id } });
  }
}
