import { PrismaService } from '../prisma/prisma.service';
export declare class PortalDaerahService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(search?: string, dinas?: string, topik?: string): Promise<({
        _count: {
            rows: number;
        };
    } & {
        id: number;
        judul: string;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        dinas: string;
        bidang: string;
        topik: string;
        tahunMulai: number;
        tahunAkhir: number;
        tanggalUpdate: string;
        dilihat: number;
        icon: string;
        iconBg: string;
        iconColor: string;
        columns: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
    findAllAdmin(): Promise<({
        _count: {
            rows: number;
        };
    } & {
        id: number;
        judul: string;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        dinas: string;
        bidang: string;
        topik: string;
        tahunMulai: number;
        tahunAkhir: number;
        tanggalUpdate: string;
        dilihat: number;
        icon: string;
        iconBg: string;
        iconColor: string;
        columns: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
    findOne(id: number): Promise<{
        rows: {
            id: number;
            urutan: number;
            data: import("@prisma/client/runtime/library").JsonValue;
            datasetId: number;
        }[];
    } & {
        id: number;
        judul: string;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        dinas: string;
        bidang: string;
        topik: string;
        tahunMulai: number;
        tahunAkhir: number;
        tanggalUpdate: string;
        dilihat: number;
        icon: string;
        iconBg: string;
        iconColor: string;
        columns: import("@prisma/client/runtime/library").JsonValue;
    }>;
    incrementView(id: number): Promise<{
        ok: boolean;
    }>;
    create(dto: {
        judul: string;
        dinas: string;
        bidang: string;
        topik: string;
        tahunMulai: number;
        tahunAkhir: number;
        deskripsi?: string;
        tanggalUpdate: string;
        icon?: string;
        iconBg?: string;
        iconColor?: string;
        columns: string[];
        rows?: Record<string, string | number>[];
    }): Promise<{
        id: number;
        judul: string;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        dinas: string;
        bidang: string;
        topik: string;
        tahunMulai: number;
        tahunAkhir: number;
        tanggalUpdate: string;
        dilihat: number;
        icon: string;
        iconBg: string;
        iconColor: string;
        columns: import("@prisma/client/runtime/library").JsonValue;
    }>;
    update(id: number, dto: {
        judul?: string;
        dinas?: string;
        bidang?: string;
        topik?: string;
        tahunMulai?: number;
        tahunAkhir?: number;
        deskripsi?: string;
        tanggalUpdate?: string;
        icon?: string;
        iconBg?: string;
        iconColor?: string;
        aktif?: boolean;
    }): Promise<{
        id: number;
        judul: string;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        dinas: string;
        bidang: string;
        topik: string;
        tahunMulai: number;
        tahunAkhir: number;
        tanggalUpdate: string;
        dilihat: number;
        icon: string;
        iconBg: string;
        iconColor: string;
        columns: import("@prisma/client/runtime/library").JsonValue;
    }>;
    replaceRows(id: number, columns: string[], rows: Record<string, string | number>[]): Promise<void>;
    remove(id: number): Promise<{
        id: number;
        judul: string;
        aktif: boolean;
        createdAt: Date;
        updatedAt: Date;
        deskripsi: string | null;
        dinas: string;
        bidang: string;
        topik: string;
        tahunMulai: number;
        tahunAkhir: number;
        tanggalUpdate: string;
        dilihat: number;
        icon: string;
        iconBg: string;
        iconColor: string;
        columns: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
