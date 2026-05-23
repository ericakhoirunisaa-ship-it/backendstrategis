import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async get() {
    const stat = await this.prisma.siteStats.findUnique({ where: { id: 1 } });
    return { pengunjung: stat?.pengunjung ?? 0 };
  }

  async kunjungan() {
    const stat = await this.prisma.siteStats.upsert({
      where: { id: 1 },
      create: { id: 1, pengunjung: 1 },
      update: { pengunjung: { increment: 1 } },
    });
    return { pengunjung: stat.pengunjung };
  }
}
