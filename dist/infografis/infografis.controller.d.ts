import { InfografisService } from './infografis.service';
declare class UpdateInfografisDto {
    judul?: string;
    deskripsi?: string;
    urutan?: number;
    aktif?: boolean;
}
export declare class InfografisController {
    private service;
    constructor(service: InfografisService);
    findAll(all?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        judul: string;
        urutan: number;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        imageUrl: string;
    }[]>;
    create(file: Express.Multer.File, judul: string, deskripsi?: string, urutan?: string): Promise<{
        id: number;
        judul: string;
        urutan: number;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        imageUrl: string;
    }>;
    update(id: number, dto: UpdateInfografisDto): Promise<{
        id: number;
        judul: string;
        urutan: number;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        imageUrl: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        judul: string;
        urutan: number;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        imageUrl: string;
    }>;
}
export {};
