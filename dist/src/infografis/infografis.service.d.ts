import { PrismaService } from '../prisma/prisma.service';
export declare class InfografisService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(onlyAktif?: boolean): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        urutan: number;
        deskripsi: string | null;
        aktif: boolean;
        judul: string;
        imageUrl: string;
    }[]>;
    create(data: {
        judul: string;
        deskripsi?: string;
        imageUrl: string;
        urutan?: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        urutan: number;
        deskripsi: string | null;
        aktif: boolean;
        judul: string;
        imageUrl: string;
    }>;
    update(id: number, data: {
        judul?: string;
        deskripsi?: string;
        urutan?: number;
        aktif?: boolean;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        urutan: number;
        deskripsi: string | null;
        aktif: boolean;
        judul: string;
        imageUrl: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        urutan: number;
        deskripsi: string | null;
        aktif: boolean;
        judul: string;
        imageUrl: string;
    }>;
}
