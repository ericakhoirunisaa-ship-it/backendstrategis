import { JadwalRilisService } from './jadwal-rilis.service';
declare class CreateJadwalDto {
    judul: string;
    tanggal: string;
    kategori?: string;
    deskripsi?: string;
    link?: string;
}
declare class UpdateJadwalDto {
    judul?: string;
    tanggal?: string;
    kategori?: string;
    deskripsi?: string;
    link?: string;
    status?: string;
}
export declare class JadwalRilisController {
    private service;
    constructor(service: JadwalRilisService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        kategori: string;
        deskripsi: string | null;
        createdAt: Date;
        updatedAt: Date;
        judul: string;
        link: string | null;
        tanggal: Date;
        status: string;
    }[]>;
    findUpcoming(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        kategori: string;
        deskripsi: string | null;
        createdAt: Date;
        updatedAt: Date;
        judul: string;
        link: string | null;
        tanggal: Date;
        status: string;
    }[]>;
    create(dto: CreateJadwalDto): Promise<{
        id: number;
        kategori: string;
        deskripsi: string | null;
        createdAt: Date;
        updatedAt: Date;
        judul: string;
        link: string | null;
        tanggal: Date;
        status: string;
    }>;
    update(id: number, dto: UpdateJadwalDto): Promise<{
        id: number;
        kategori: string;
        deskripsi: string | null;
        createdAt: Date;
        updatedAt: Date;
        judul: string;
        link: string | null;
        tanggal: Date;
        status: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        kategori: string;
        deskripsi: string | null;
        createdAt: Date;
        updatedAt: Date;
        judul: string;
        link: string | null;
        tanggal: Date;
        status: string;
    }>;
}
export {};
