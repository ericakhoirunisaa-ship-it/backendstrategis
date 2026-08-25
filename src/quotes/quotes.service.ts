import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  findAll(onlyAktif = true) {
    return this.prisma.quote.findMany({
      where: onlyAktif ? { aktif: true } : {},
      orderBy: [{ urutan: 'asc' }, { createdAt: 'asc' }],
    });
  }

  create(data: { teks: string; penulis?: string; urutan?: number }) {
    return this.prisma.quote.create({ data });
  }

  async update(id: number, data: { teks?: string; penulis?: string; urutan?: number; aktif?: boolean }) {
    const existing = await this.prisma.quote.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Quote #${id} tidak ditemukan`);
    return this.prisma.quote.update({ where: { id }, data });
  }

  async remove(id: number) {
    const existing = await this.prisma.quote.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Quote #${id} tidak ditemukan`);
    return this.prisma.quote.delete({ where: { id } });
  }
}
