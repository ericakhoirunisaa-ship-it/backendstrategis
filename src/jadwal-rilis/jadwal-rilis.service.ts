import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JadwalRilisService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.jadwalRilis.findMany({ orderBy: { tanggal: 'asc' } });
  }

  findUpcoming() {
    return this.prisma.jadwalRilis.findMany({
      where: { tanggal: { gte: new Date() } },
      orderBy: { tanggal: 'asc' },
      take: 6,
    });
  }

  async create(data: { judul: string; tanggal: Date; kategori?: string; deskripsi?: string; link?: string }) {
    return this.prisma.jadwalRilis.create({ data });
  }

  async update(id: number, data: { judul?: string; tanggal?: Date; kategori?: string; deskripsi?: string; link?: string; status?: string }) {
    const existing = await this.prisma.jadwalRilis.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Jadwal #${id} tidak ditemukan`);
    return this.prisma.jadwalRilis.update({ where: { id }, data });
  }

  async remove(id: number) {
    const existing = await this.prisma.jadwalRilis.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Jadwal #${id} tidak ditemukan`);
    return this.prisma.jadwalRilis.delete({ where: { id } });
  }
}
