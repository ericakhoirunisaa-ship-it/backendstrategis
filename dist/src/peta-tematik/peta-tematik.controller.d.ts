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
            slug: string;
            nama: string;
        } | null;
    } & {
        id: number;
        indikatorId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        judul: string;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    })[]>;
    findOne(id: number): Promise<{
        indikator: {
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
        } | null;
    } & {
        id: number;
        indikatorId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        judul: string;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }>;
    create(dto: CreatePetaDto): import(".prisma/client").Prisma.Prisma__PetaTematikClient<{
        id: number;
        indikatorId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        judul: string;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdatePetaDto): Promise<{
        id: number;
        indikatorId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        judul: string;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        indikatorId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        judul: string;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }>;
}
export {};
