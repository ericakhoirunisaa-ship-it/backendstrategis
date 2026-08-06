import { PrismaService } from '../prisma/prisma.service';
export declare class PetaTematikService {
    private prisma;
    constructor(prisma: PrismaService);
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
    create(data: {
        judul: string;
        deskripsi?: string;
        imageUrl?: string;
        geoJsonUrl?: string;
        indikatorId?: number;
    }): import(".prisma/client").Prisma.Prisma__PetaTematikClient<{
        id: number;
        judul: string;
        createdAt: Date;
        updatedAt: Date;
        indikatorId: number | null;
        deskripsi: string | null;
        imageUrl: string | null;
        geoJsonUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, data: {
        judul?: string;
        deskripsi?: string;
        imageUrl?: string;
        geoJsonUrl?: string;
        indikatorId?: number;
    }): Promise<{
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
