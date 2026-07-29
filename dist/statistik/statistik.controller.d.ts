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
        updatedAt: Date;
        label: string;
        nilai: string;
        satuan: string;
        tahun: number;
        icon: string | null;
        warna: string;
        urutan: number;
    }[]>;
    create(dto: CreateStatistikDto): Promise<{
        id: number;
        updatedAt: Date;
        label: string;
        nilai: string;
        satuan: string;
        tahun: number;
        icon: string | null;
        warna: string;
        urutan: number;
    }>;
    update(id: number, dto: UpdateStatistikDto): Promise<{
        id: number;
        updatedAt: Date;
        label: string;
        nilai: string;
        satuan: string;
        tahun: number;
        icon: string | null;
        warna: string;
        urutan: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        updatedAt: Date;
        label: string;
        nilai: string;
        satuan: string;
        tahun: number;
        icon: string | null;
        warna: string;
        urutan: number;
    }>;
}
export {};
