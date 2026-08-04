import { PrismaService } from '../prisma/prisma.service';
export declare class StatistikService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        satuan: string;
        updatedAt: Date;
        tahun: number;
        nilai: string;
        warna: string;
        urutan: number;
        label: string;
        icon: string | null;
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
        satuan: string;
        updatedAt: Date;
        tahun: number;
        nilai: string;
        warna: string;
        urutan: number;
        label: string;
        icon: string | null;
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
        satuan: string;
        updatedAt: Date;
        tahun: number;
        nilai: string;
        warna: string;
        urutan: number;
        label: string;
        icon: string | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        satuan: string;
        updatedAt: Date;
        tahun: number;
        nilai: string;
        warna: string;
        urutan: number;
        label: string;
        icon: string | null;
    }>;
}
