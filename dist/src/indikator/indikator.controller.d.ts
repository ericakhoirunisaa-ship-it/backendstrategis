import { IndikatorService } from './indikator.service';
declare class CreateIndikatorDto {
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
}
declare class UpdateIndikatorDto {
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
}
declare class AddDataPointDto {
    tahun: number;
    daerah?: string;
    kolom?: string;
    nilai: number;
    keterangan?: string;
}
export declare class IndikatorController {
    private service;
    constructor(service: IndikatorService);
    findAll(search?: string, kategori?: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    findOne(slug: string): Promise<{
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
    create(dto: CreateIndikatorDto): Promise<{
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
    update(id: number, dto: UpdateIndikatorDto): Promise<{
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
    addData(id: number, dto: AddDataPointDto): Promise<{
        id: number;
        tahun: number;
        daerah: string;
        kolom: string;
        nilai: number;
        keterangan: string | null;
        indikatorId: number;
        createdAt: Date;
    }>;
}
export {};
