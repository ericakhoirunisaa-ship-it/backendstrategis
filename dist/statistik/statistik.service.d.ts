import { PrismaService } from '../prisma/prisma.service';
export declare class StatistikService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nilai: string;
        satuan: string;
        warna: string;
        urutan: number;
        tahun: number;
        updatedAt: Date;
        icon: string | null;
        label: string;
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
        nilai: string;
        satuan: string;
        warna: string;
        urutan: number;
        tahun: number;
        updatedAt: Date;
        icon: string | null;
        label: string;
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
        nilai: string;
        satuan: string;
        warna: string;
        urutan: number;
        tahun: number;
        updatedAt: Date;
        icon: string | null;
        label: string;
    }>;
    delete(id: number): Promise<{
        id: number;
        nilai: string;
        satuan: string;
        warna: string;
        urutan: number;
        tahun: number;
        updatedAt: Date;
        icon: string | null;
        label: string;
    }>;
}
