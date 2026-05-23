import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class InfografisService {
  constructor(private prisma: PrismaService) {}

  findAll(onlyAktif = true) {
    return this.prisma.infografis.findMany({
      where: onlyAktif ? { aktif: true } : {},
      orderBy: [{ urutan: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async create(data: { judul: string; deskripsi?: string; imageUrl: string; urutan?: number }) {
    return this.prisma.infografis.create({ data });
  }

  async update(id: number, data: { judul?: string; deskripsi?: string; urutan?: number; aktif?: boolean }) {
    const existing = await this.prisma.infografis.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Infografis #${id} tidak ditemukan`);
    return this.prisma.infografis.update({ where: { id }, data });
  }

  async remove(id: number) {
    const existing = await this.prisma.infografis.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Infografis #${id} tidak ditemukan`);
    // Hapus file dari disk
    try {
      unlinkSync(join(process.cwd(), existing.imageUrl.replace('/uploads', 'uploads')));
    } catch {}
    return this.prisma.infografis.delete({ where: { id } });
  }
}
