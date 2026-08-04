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
        nama: string;
        slug: string;
        satuan: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
        defaultTampilan: string;
        labelDaerah: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(slug: string): Promise<{
        data: {
            id: number;
            createdAt: Date;
            daerah: string;
            tahun: number;
            kolom: string;
            nilai: number;
            keterangan: string | null;
            indikatorId: number;
        }[];
    } & {
        id: number;
        nama: string;
        slug: string;
        satuan: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
        defaultTampilan: string;
        labelDaerah: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: CreateIndikatorDto): Promise<{
        id: number;
        nama: string;
        slug: string;
        satuan: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
        defaultTampilan: string;
        labelDaerah: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdateIndikatorDto): Promise<{
        id: number;
        nama: string;
        slug: string;
        satuan: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
        defaultTampilan: string;
        labelDaerah: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        nama: string;
        slug: string;
        satuan: string;
        kategori: string;
        tipeChart: string;
        deskripsi: string | null;
        definisi: string | null;
        metodologi: string | null;
        sumberData: string | null;
        interpretasi: string | null;
        aktif: boolean;
        filterTahun: boolean;
        filterDaerah: boolean;
        filterKolom: boolean;
        defaultTampilan: string;
        labelDaerah: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addData(id: number, dto: AddDataPointDto): Promise<{
        id: number;
        createdAt: Date;
        daerah: string;
        tahun: number;
        kolom: string;
        nilai: number;
        keterangan: string | null;
        indikatorId: number;
    }>;
    updateDataPointKeterangan(id: number, dto: UpdateDataPointKeteranganDto): Promise<{
        id: number;
        createdAt: Date;
        daerah: string;
        tahun: number;
        kolom: string;
        nilai: number;
        keterangan: string | null;
        indikatorId: number;
    }>;
}
export {};
