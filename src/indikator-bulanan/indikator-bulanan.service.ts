import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
