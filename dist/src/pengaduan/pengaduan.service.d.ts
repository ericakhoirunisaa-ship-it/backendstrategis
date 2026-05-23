import { PrismaService } from '../prisma/prisma.service';
export declare class PengaduanService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        catatan: string | null;
        namaLengkap: string;
        noIdentitas: string;
        fotoIdentitas: string;
        alamat: string;
        noTelpon: string;
        isiPengaduan: string;
        lampiran: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        catatan: string | null;
        namaLengkap: string;
        noIdentitas: string;
        fotoIdentitas: string;
        alamat: string;
        noTelpon: string;
        isiPengaduan: string;
        lampiran: string | null;
    }>;
    create(data: {
        namaLengkap: string;
        noIdentitas: string;
        fotoIdentitas: string;
        alamat: string;
        noTelpon: string;
        isiPengaduan: string;
        lampiran?: string;
    }): import(".prisma/client").Prisma.Prisma__PengaduanClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        catatan: string | null;
        namaLengkap: string;
        noIdentitas: string;
        fotoIdentitas: string;
        alamat: string;
        noTelpon: string;
        isiPengaduan: string;
        lampiran: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, data: {
        status?: string;
        catatan?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        catatan: string | null;
        namaLengkap: string;
        noIdentitas: string;
        fotoIdentitas: string;
        alamat: string;
        noTelpon: string;
        isiPengaduan: string;
        lampiran: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        catatan: string | null;
        namaLengkap: string;
        noIdentitas: string;
        fotoIdentitas: string;
        alamat: string;
        noTelpon: string;
        isiPengaduan: string;
        lampiran: string | null;
    }>;
}
