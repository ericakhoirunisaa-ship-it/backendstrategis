import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
export declare class PengaduanService {
    private prisma;
    private notification;
    constructor(prisma: PrismaService, notification: NotificationService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
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
        email: string | null;
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
        email?: string;
        isiPengaduan: string;
        lampiran?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
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
    update(id: number, data: {
        status?: string;
        catatan?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
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
        email: string | null;
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
