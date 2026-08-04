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
        satuan: string;
        updatedAt: Date;
        tahun: number;
        nilai: string;
        warna: string;
        urutan: number;
        label: string;
        icon: string | null;
    }[]>;
    create(dto: CreateStatistikDto): Promise<{
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
    update(id: number, dto: UpdateStatistikDto): Promise<{
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
export {};
