import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class MusikService {
  constructor(private prisma: PrismaService) {}

  findAll(onlyAktif = true) {
    return this.prisma.musik.findMany({
      where: onlyAktif ? { aktif: true } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: { judul: string; audioUrl: string }) {
    return this.prisma.musik.create({ data });
  }

  async update(id: number, data: { judul?: string; aktif?: boolean }) {
    const existing = await this.prisma.musik.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Musik #${id} tidak ditemukan`);
    return this.prisma.musik.update({ where: { id }, data });
  }

  async remove(id: number) {
    const existing = await this.prisma.musik.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Musik #${id} tidak ditemukan`);
    try {
      unlinkSync(join(process.cwd(), existing.audioUrl.replace('/uploads', 'uploads')));
    } catch {}
    return this.prisma.musik.delete({ where: { id } });
  }
}
