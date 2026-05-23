import { PengaduanService } from './pengaduan.service';
declare class UpdatePengaduanDto {
    status?: string;
    catatan?: string;
}
export declare class PengaduanController {
    private service;
    constructor(service: PengaduanService);
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
    create(files: {
        fotoIdentitas?: Express.Multer.File[];
        lampiran?: Express.Multer.File[];
    }, namaLengkap: string, noIdentitas: string, alamat: string, noTelpon: string, isiPengaduan: string): Promise<{
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
    update(id: number, dto: UpdatePengaduanDto): Promise<{
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
export {};
