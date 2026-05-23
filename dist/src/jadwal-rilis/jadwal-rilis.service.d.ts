import { PrismaService } from '../prisma/prisma.service';
export declare class JadwalRilisService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        link: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        kategori: string;
        deskripsi: string | null;
        judul: string;
        tanggal: Date;
        status: string;
    }[]>;
    findUpcoming(): import(".prisma/client").Prisma.PrismaPromise<{
        link: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        kategori: string;
        deskripsi: string | null;
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
        link: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        kategori: string;
        deskripsi: string | null;
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
        link: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        kategori: string;
        deskripsi: string | null;
        judul: string;
        tanggal: Date;
        status: string;
    }>;
    remove(id: number): Promise<{
        link: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        kategori: string;
        deskripsi: string | null;
        judul: string;
        tanggal: Date;
        status: string;
    }>;
}
