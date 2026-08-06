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
    filterTahun?: boolean;
    filterDaerah?: boolean;
    filterKolom?: boolean;
}
declare class AddDataPointDto {
    tahun: number;
    daerah?: string;
    kolom?: string;
    nilai: number;
    keterangan?: string;
}
declare class UpdateDataPointKeteranganDto {
    keterangan?: string;
}
export declare class IndikatorController {
    private service;
    constructor(service: IndikatorService);
    findAll(search?: string, kategori?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        satuan: string;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        slug: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
        defaultTampilan: string;
        labelDaerah: string | null;
    }[]>;
    findOne(slug: string): Promise<{
        data: {
            id: number;
            nilai: number;
            keterangan: string | null;
            tahun: number;
            createdAt: Date;
            daerah: string;
            kolom: string;
            indikatorId: number;
        }[];
    } & {
        id: number;
        satuan: string;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        slug: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
        defaultTampilan: string;
        labelDaerah: string | null;
    }>;
    create(dto: CreateIndikatorDto): Promise<{
        id: number;
        satuan: string;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        slug: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
        defaultTampilan: string;
        labelDaerah: string | null;
    }>;
    update(id: number, dto: UpdateIndikatorDto): Promise<{
        id: number;
        satuan: string;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        slug: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
        defaultTampilan: string;
        labelDaerah: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        satuan: string;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        slug: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
        defaultTampilan: string;
        labelDaerah: string | null;
    }>;
    addData(id: number, dto: AddDataPointDto): Promise<{
        id: number;
        nilai: number;
        keterangan: string | null;
        tahun: number;
        createdAt: Date;
        daerah: string;
        kolom: string;
        indikatorId: number;
    }>;
    updateDataPointKeterangan(id: number, dto: UpdateDataPointKeteranganDto): Promise<{
        id: number;
        nilai: number;
        keterangan: string | null;
        tahun: number;
        createdAt: Date;
        daerah: string;
        kolom: string;
        indikatorId: number;
    }>;
}
export {};
