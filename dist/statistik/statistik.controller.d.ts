import { StatistikService } from './statistik.service';
declare class CreateStatistikDto {
    label: string;
    nilai: string;
    satuan: string;
    tahun: number;
    icon?: string;
    warna?: string;
    urutan?: number;
}
declare class UpdateStatistikDto {
    label?: string;
    nilai?: string;
    satuan?: string;
    tahun?: number;
    icon?: string;
    warna?: string;
    urutan?: number;
}
export declare class StatistikController {
    private service;
    constructor(service: StatistikService);
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
    create(dto: CreateStatistikDto): Promise<{
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
    update(id: number, dto: UpdateStatistikDto): Promise<{
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
export {};
