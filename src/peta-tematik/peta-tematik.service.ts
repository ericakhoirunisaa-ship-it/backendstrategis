import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetaTematikService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.petaTematik.findMany({
      include: { indikator: { select: { id: true, nama: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const peta = await this.prisma.petaTematik.findUnique({
      where: { id },
      include: { indikator: true },
    });
    if (!peta) throw new NotFoundException(`Peta #${id} tidak ditemukan`);
    return peta;
  }

  create(data: { judul: string; deskripsi?: string; imageUrl?: string; geoJsonUrl?: string; indikatorId?: number }) {
    return this.prisma.petaTematik.create({ data });
  }

  async update(id: number, data: { judul?: string; deskripsi?: string; imageUrl?: string; geoJsonUrl?: string; indikatorId?: number }) {
    const existing = await this.prisma.petaTematik.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Peta #${id} tidak ditemukan`);
    return this.prisma.petaTematik.update({ where: { id }, data });
  }

  async remove(id: number) {
    const existing = await this.prisma.petaTematik.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Peta #${id} tidak ditemukan`);
    return this.prisma.petaTematik.delete({ where: { id } });
  }
}
