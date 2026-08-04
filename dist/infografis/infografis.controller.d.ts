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
        deskripsi: string | null;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        judul: string;
        urutan: number;
        imageUrl: string;
    }[]>;
    create(file: Express.Multer.File, judul: string, deskripsi?: string, urutan?: string): Promise<{
        id: number;
        deskripsi: string | null;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        judul: string;
        urutan: number;
        imageUrl: string;
    }>;
    update(id: number, dto: UpdateInfografisDto): Promise<{
        id: number;
        deskripsi: string | null;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        judul: string;
        urutan: number;
        imageUrl: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        deskripsi: string | null;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        judul: string;
        urutan: number;
        imageUrl: string;
    }>;
}
export {};
