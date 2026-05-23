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
        slug: string;
        nama: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
    }[]>;
    findBySlug(slug: string): Promise<{
        data: {
            id: number;
            tahun: number;
            daerah: string;
            kolom: string;
            nilai: number;
            keterangan: string | null;
            indikatorId: number;
            createdAt: Date;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        satuan: string;
        slug: string;
        nama: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
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
        slug: string;
        nama: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
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
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        satuan: string;
        slug: string;
        nama: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        satuan: string;
        slug: string;
        nama: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
    }>;
    addDataPoint(indikatorId: number, point: {
        tahun: number;
        daerah?: string;
        kolom?: string;
        nilai: number;
        keterangan?: string;
    }): Promise<{
        id: number;
        tahun: number;
        daerah: string;
        kolom: string;
        nilai: number;
        keterangan: string | null;
        indikatorId: number;
        createdAt: Date;
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
