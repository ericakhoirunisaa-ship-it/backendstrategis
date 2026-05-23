import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatistikService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.statistikUtama.findMany({ orderBy: { urutan: 'asc' } });
  }

  async create(data: { label: string; nilai: string; satuan: string; tahun: number; icon?: string; warna?: string; urutan?: number }) {
    const last = await this.prisma.statistikUtama.findFirst({ orderBy: { urutan: 'desc' } });
    return this.prisma.statistikUtama.create({
      data: { ...data, urutan: data.urutan ?? (last ? last.urutan + 1 : 0) },
    });
  }

  async update(id: number, data: { label?: string; nilai?: string; satuan?: string; tahun?: number; icon?: string; warna?: string; urutan?: number }) {
    const existing = await this.prisma.statistikUtama.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Statistik #${id} tidak ditemukan`);
    return this.prisma.statistikUtama.update({ where: { id }, data });
  }

  async delete(id: number) {
    const existing = await this.prisma.statistikUtama.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Statistik #${id} tidak ditemukan`);
    return this.prisma.statistikUtama.delete({ where: { id } });
  }
}
