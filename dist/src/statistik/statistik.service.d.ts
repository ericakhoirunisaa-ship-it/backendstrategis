import { PrismaService } from '../prisma/prisma.service';
export declare class StatistikService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        tahun: number;
        nilai: string;
        updatedAt: Date;
        label: string;
        satuan: string;
        icon: string | null;
        warna: string;
        urutan: number;
    }[]>;
    create(data: {
        label: string;
        nilai: string;
        satuan: string;
        tahun: number;
        icon?: string;
        warna?: string;
        urutan?: number;
    }): Promise<{
        id: number;
        tahun: number;
        nilai: string;
        updatedAt: Date;
        label: string;
        satuan: string;
        icon: string | null;
        warna: string;
        urutan: number;
    }>;
    update(id: number, data: {
        label?: string;
        nilai?: string;
        satuan?: string;
        tahun?: number;
        icon?: string;
        warna?: string;
        urutan?: number;
    }): Promise<{
        id: number;
        tahun: number;
        nilai: string;
        updatedAt: Date;
        label: string;
        satuan: string;
        icon: string | null;
        warna: string;
        urutan: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        tahun: number;
        nilai: string;
        updatedAt: Date;
        label: string;
        satuan: string;
        icon: string | null;
        warna: string;
        urutan: number;
    }>;
}
