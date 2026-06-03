import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class PengaduanService {
  constructor(
    private prisma: PrismaService,
    private notification: NotificationService,
  ) {}

  findAll() {
    return this.prisma.pengaduan.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const p = await this.prisma.pengaduan.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Pengaduan tidak ditemukan');
    return p;
  }

  async create(data: {
    namaLengkap: string;
    noIdentitas: string;
    fotoIdentitas: string;
    alamat: string;
    noTelpon: string;
    email?: string;
    isiPengaduan: string;
    lampiran?: string;
  }) {
    const pengaduan = await this.prisma.pengaduan.create({ data });

    // Kirim notifikasi tanpa menggagalkan proses submit
    void this.notification.kirimWhatsAppKonfirmasi(data.noTelpon, data.namaLengkap);
    if (data.email) {
      void this.notification.kirimEmailKonfirmasi(data.email, data.namaLengkap);
    }

    return pengaduan;
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
