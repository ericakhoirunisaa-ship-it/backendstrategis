import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type SubmitDto = {
  u1: number; u2: number; u3: number; u4: number; u5: number;
  k1: number; k2: number; k3: number; k4: number; k5: number;
  s1: number; s2: number; s3: number; s4: number;
  nama?: string; instansi?: string;
};

@Injectable()
export class KepuasanService {
  constructor(private prisma: PrismaService) {}

  create(data: SubmitDto) {
    return this.prisma.surveiKepuasan.create({ data });
  }

  findAll() {
    return this.prisma.surveiKepuasan.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getStats() {
    const rows = await this.prisma.surveiKepuasan.findMany();
    const n = rows.length;
    if (n === 0) return { total: 0, usability: null, konten: null, overall: null, rows: [] };

    const avg = (field: keyof typeof rows[0]) =>
      +(rows.reduce((s, r) => s + (r[field] as number), 0) / n).toFixed(2);

    const usability = { u1: avg('u1'), u2: avg('u2'), u3: avg('u3'), u4: avg('u4'), u5: avg('u5') };
    const konten    = { k1: avg('k1'), k2: avg('k2'), k3: avg('k3'), k4: avg('k4'), k5: avg('k5') };
    const kepuasan  = { s1: avg('s1'), s2: avg('s2'), s3: avg('s3'), s4: avg('s4') };

    const avgU = +((usability.u1 + usability.u2 + usability.u3 + usability.u4 + usability.u5) / 5).toFixed(2);
    const avgK = +((konten.k1 + konten.k2 + konten.k3 + konten.k4 + konten.k5) / 5).toFixed(2);
    const avgS = +((kepuasan.s1 + kepuasan.s2 + kepuasan.s3 + kepuasan.s4) / 4).toFixed(2);

    return { total: n, usability, konten, kepuasan, avgU, avgK, avgS };
  }
}
