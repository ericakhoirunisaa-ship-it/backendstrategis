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
        judul: string;
        createdAt: Date;
        updatedAt: Date;
        indikatorId: number | null;
        deskripsi: string | null;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    })[]>;
    findOne(id: number): Promise<{
        indikator: {
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
        } | null;
    } & {
        id: number;
        judul: string;
        createdAt: Date;
        updatedAt: Date;
        indikatorId: number | null;
        deskripsi: string | null;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }>;
    create(dto: CreatePetaDto): import(".prisma/client").Prisma.Prisma__PetaTematikClient<{
        id: number;
        judul: string;
        createdAt: Date;
        updatedAt: Date;
        indikatorId: number | null;
        deskripsi: string | null;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdatePetaDto): Promise<{
        id: number;
        judul: string;
        createdAt: Date;
        updatedAt: Date;
        indikatorId: number | null;
        deskripsi: string | null;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        judul: string;
        createdAt: Date;
        updatedAt: Date;
        indikatorId: number | null;
        deskripsi: string | null;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }>;
}
export {};
