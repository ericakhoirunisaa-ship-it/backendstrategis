import { PrismaService } from '../prisma/prisma.service';
export declare class StatsService {
    private prisma;
    constructor(prisma: PrismaService);
    get(): Promise<{
        pengunjung: number;
    }>;
    kunjungan(): Promise<{
        pengunjung: number;
    }>;
}
