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
exports.PortalDaerahService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PortalDaerahService = class PortalDaerahService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(search, dinas, topik) {
        const datasets = await this.prisma.portalDaerahDataset.findMany({
            where: {
                aktif: true,
                ...(dinas ? { dinas } : {}),
                ...(topik ? { topik } : {}),
                ...(search
                    ? {
                        OR: [
                            { judul: { contains: search } },
                            { dinas: { contains: search } },
                            { bidang: { contains: search } },
                        ],
                    }
                    : {}),
            },
            include: { _count: { select: { rows: true } } },
            orderBy: { createdAt: 'desc' },
        });
        return datasets;
    }
    async findAllAdmin() {
        return this.prisma.portalDaerahDataset.findMany({
            include: { _count: { select: { rows: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const dataset = await this.prisma.portalDaerahDataset.findUnique({
            where: { id },
            include: { rows: { orderBy: { urutan: 'asc' } } },
        });
        if (!dataset)
            throw new common_1.NotFoundException(`Dataset #${id} tidak ditemukan`);
        return dataset;
    }
    async incrementView(id) {
        const existing = await this.prisma.portalDaerahDataset.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Dataset #${id} tidak ditemukan`);
        await this.prisma.portalDaerahDataset.update({
            where: { id },
            data: { dilihat: { increment: 1 } },
        });
        return { ok: true };
    }
    async create(dto) {
        const { rows, columns, ...meta } = dto;
        return this.prisma.$transaction(async (tx) => {
            const dataset = await tx.portalDaerahDataset.create({
                data: { ...meta, columns: columns },
            });
            if (rows && rows.length > 0) {
                await tx.portalDaerahRow.createMany({
                    data: rows.map((r, i) => ({
                        datasetId: dataset.id,
                        data: r,
                        urutan: i,
                    })),
                });
            }
            return dataset;
        });
    }
    async update(id, dto) {
        const existing = await this.prisma.portalDaerahDataset.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Dataset #${id} tidak ditemukan`);
        return this.prisma.portalDaerahDataset.update({ where: { id }, data: dto });
    }
    async replaceRows(id, columns, rows) {
        const existing = await this.prisma.portalDaerahDataset.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Dataset #${id} tidak ditemukan`);
        return this.prisma.$transaction(async (tx) => {
            await tx.portalDaerahRow.deleteMany({ where: { datasetId: id } });
            await tx.portalDaerahDataset.update({
                where: { id },
                data: { columns: columns, tanggalUpdate: existing.tanggalUpdate },
            });
            if (rows.length > 0) {
                await tx.portalDaerahRow.createMany({
                    data: rows.map((r, i) => ({
                        datasetId: id,
                        data: r,
                        urutan: i,
                    })),
                });
            }
        });
    }
    async remove(id) {
        const existing = await this.prisma.portalDaerahDataset.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Dataset #${id} tidak ditemukan`);
        return this.prisma.portalDaerahDataset.delete({ where: { id } });
    }
};
exports.PortalDaerahService = PortalDaerahService;
exports.PortalDaerahService = PortalDaerahService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PortalDaerahService);
//# sourceMappingURL=portal-daerah.service.js.map