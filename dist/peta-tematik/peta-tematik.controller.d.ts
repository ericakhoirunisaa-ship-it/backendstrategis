import { PetaTematikService } from './peta-tematik.service';
declare class CreatePetaDto {
    judul: string;
    deskripsi?: string;
    imageUrl?: string;
    geoJsonUrl?: string;
    indikatorId?: number;
}
declare class UpdatePetaDto {
    judul?: string;
    deskripsi?: string;
    imageUrl?: string;
    geoJsonUrl?: string;
    indikatorId?: number;
}
export declare class PetaTematikController {
    private service;
    constructor(service: PetaTematikService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        indikator: {
            id: number;
            nama: string;
            slug: string;
        } | null;
    } & {
        id: number;
        deskripsi: string | null;
        createdAt: Date;
        updatedAt: Date;
        indikatorId: number | null;
        judul: string;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    })[]>;
    findOne(id: number): Promise<{
        indikator: {
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
        } | null;
    } & {
        id: number;
        deskripsi: string | null;
        createdAt: Date;
        updatedAt: Date;
        indikatorId: number | null;
        judul: string;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }>;
    create(dto: CreatePetaDto): import(".prisma/client").Prisma.Prisma__PetaTematikClient<{
        id: number;
        deskripsi: string | null;
        createdAt: Date;
        updatedAt: Date;
        indikatorId: number | null;
        judul: string;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdatePetaDto): Promise<{
        id: number;
        deskripsi: string | null;
        createdAt: Date;
        updatedAt: Date;
        indikatorId: number | null;
        judul: string;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        deskripsi: string | null;
        createdAt: Date;
        updatedAt: Date;
        indikatorId: number | null;
        judul: string;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }>;
}
export {};
