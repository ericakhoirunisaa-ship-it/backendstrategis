"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndikatorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}
let IndikatorService = class IndikatorService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(filters) {
        const where = { aktif: true };
        if (filters?.search) {
            where.OR = [
                { nama: { contains: filters.search } },
                { kategori: { contains: filters.search } },
                { deskripsi: { contains: filters.search } },
            ];
        }
        if (filters?.kategori) {
            where.kategori = { contains: filters.kategori };
        }
        return this.prisma.indikator.findMany({
            where,
            orderBy: { nama: 'asc' },
        });
    }
    async findBySlug(slug) {
        const ind = await this.prisma.indikator.findUnique({
            where: { slug },
            include: {
                data: { orderBy: [{ tahun: 'asc' }, { daerah: 'asc' }] },
            },
        });
        if (!ind)
            throw new common_1.NotFoundException(`Indikator '${slug}' tidak ditemukan`);
        return ind;
    }
    async create(data) {
        const base = data.slug || slugify(data.nama);
        let slug = base;
        let counter = 1;
        while (await this.prisma.indikator.findUnique({ where: { slug } })) {
            slug = `${base}-${counter++}`;
        }
        return this.prisma.indikator.create({ data: { ...data, slug } });
    }
    async update(id, data) {
        const existing = await this.prisma.indikator.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Indikator #${id} tidak ditemukan`);
        return this.prisma.indikator.update({ where: { id }, data });
    }
    async remove(id) {
        const existing = await this.prisma.indikator.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Indikator #${id} tidak ditemukan`);
        return this.prisma.indikator.delete({ where: { id } });
    }
    async addDataPoint(indikatorId, point) {
        const existing = await this.prisma.indikator.findUnique({ where: { id: indikatorId } });
        if (!existing)
            throw new common_1.NotFoundException(`Indikator #${indikatorId} tidak ditemukan`);
        return this.prisma.dataPoint.upsert({
            where: {
                tahun_daerah_kolom_indikatorId: {
                    tahun: point.tahun,
                    daerah: point.daerah || 'Toli-Toli',
                    kolom: point.kolom || 'nilai',
                    indikatorId,
                },
            },
            update: { nilai: point.nilai, keterangan: point.keterangan },
            create: {
                tahun: point.tahun,
                daerah: point.daerah || 'Toli-Toli',
                kolom: point.kolom || 'nilai',
                nilai: point.nilai,
                keterangan: point.keterangan,
                indikatorId,
            },
        });
    }
    async bulkUpsertDataPoints(indikatorId, points) {
        const results = [];
        for (const p of points) {
            const r = await this.addDataPoint(indikatorId, p);
            results.push(r);
        }
        return { inserted: results.length };
    }
};
exports.IndikatorService = IndikatorService;
exports.IndikatorService = IndikatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IndikatorService);
//# sourceMappingURL=indikator.service.js.map