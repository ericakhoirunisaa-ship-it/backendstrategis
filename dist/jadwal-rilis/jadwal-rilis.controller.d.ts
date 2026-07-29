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
    create(dto: CreateJadwalDto): Promise<{
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
    update(id: number, dto: UpdateJadwalDto): Promise<{
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
export {};
