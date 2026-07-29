import { PrismaService } from '../prisma/prisma.service';
export declare class JadwalRilisService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        deskripsi: string | null;
        kategori: string;
        judul: string;
        tanggal: Date;
        status: string;
    }[]>;
    findUpcoming(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        deskripsi: string | null;
        kategori: string;
        judul: string;
        tanggal: Date;
        status: string;
    }[]>;
    create(data: {
        judul: string;
        tanggal: Date;
        kategori?: string;
        deskripsi?: string;
        link?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        deskripsi: string | null;
        kategori: string;
        judul: string;
        tanggal: Date;
        status: string;
    }>;
    update(id: number, data: {
        judul?: string;
        tanggal?: Date;
        kategori?: string;
        deskripsi?: string;
        link?: string;
        status?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        deskripsi: string | null;
        kategori: string;
        judul: string;
        tanggal: Date;
        status: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        deskripsi: string | null;
        kategori: string;
        judul: string;
        tanggal: Date;
        status: string;
    }>;
}
