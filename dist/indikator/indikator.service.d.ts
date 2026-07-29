import { PrismaService } from '../prisma/prisma.service';
export declare class IndikatorService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        search?: string;
        kategori?: string;
    }): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        satuan: string;
        deskripsi: string | null;
        kategori: string;
        nama: string;
        slug: string;
        tipeChart: string;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
    }[]>;
    findBySlug(slug: string): Promise<{
        data: {
            id: number;
            createdAt: Date;
            nilai: number;
            tahun: number;
            daerah: string;
            kolom: string;
            keterangan: string | null;
            indikatorId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        satuan: string;
        deskripsi: string | null;
        kategori: string;
        nama: string;
        slug: string;
        tipeChart: string;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
    }>;
    create(data: {
        nama: string;
        slug?: string;
        satuan: string;
        kategori?: string;
        tipeChart?: string;
        deskripsi?: string;
        definisi?: string;
        metodologi?: string;
        sumberData?: string;
        interpretasi?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        satuan: string;
        deskripsi: string | null;
        kategori: string;
        nama: string;
        slug: string;
        tipeChart: string;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
    }>;
    update(id: number, data: {
        nama?: string;
        satuan?: string;
        kategori?: string;
        tipeChart?: string;
        deskripsi?: string;
        definisi?: string;
        metodologi?: string;
        sumberData?: string;
        interpretasi?: string;
        aktif?: boolean;
        filterTahun?: boolean;
        filterDaerah?: boolean;
        filterKolom?: boolean;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        satuan: string;
        deskripsi: string | null;
        kategori: string;
        nama: string;
        slug: string;
        tipeChart: string;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        satuan: string;
        deskripsi: string | null;
        kategori: string;
        nama: string;
        slug: string;
        tipeChart: string;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
    }>;
    addDataPoint(indikatorId: number, point: {
        tahun: number;
        daerah?: string;
        kolom?: string;
        nilai: number;
        keterangan?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        nilai: number;
        tahun: number;
        daerah: string;
        kolom: string;
        keterangan: string | null;
        indikatorId: number;
    }>;
    updateDataPointKeterangan(id: number, keterangan: string | null): Promise<{
        id: number;
        createdAt: Date;
        nilai: number;
        tahun: number;
        daerah: string;
        kolom: string;
        keterangan: string | null;
        indikatorId: number;
    }>;
    bulkUpsertDataPoints(indikatorId: number, points: Array<{
        tahun: number;
        daerah?: string;
        kolom?: string;
        nilai: number;
        keterangan?: string;
    }>): Promise<{
        inserted: number;
    }>;
}
