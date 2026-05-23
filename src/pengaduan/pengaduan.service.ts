import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PengaduanService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.pengaduan.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const p = await this.prisma.pengaduan.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Pengaduan tidak ditemukan');
    return p;
  }

  create(data: {
    namaLengkap: string;
    noIdentitas: string;
    fotoIdentitas: string;
    alamat: string;
    noTelpon: string;
    isiPengaduan: string;
    lampiran?: string;
  }) {
    return this.prisma.pengaduan.create({ data });
  }

  async update(id: number, data: { status?: string; catatan?: string }) {
    await this.findOne(id);
    return this.prisma.pengaduan.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.pengaduan.delete({ where: { id } });
  }
}
