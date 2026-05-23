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
exports.InfografisService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs_1 = require("fs");
const path_1 = require("path");
let InfografisService = class InfografisService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(onlyAktif = true) {
        return this.prisma.infografis.findMany({
            where: onlyAktif ? { aktif: true } : {},
            orderBy: [{ urutan: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async create(data) {
        return this.prisma.infografis.create({ data });
    }
    async update(id, data) {
        const existing = await this.prisma.infografis.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Infografis #${id} tidak ditemukan`);
        return this.prisma.infografis.update({ where: { id }, data });
    }
    async remove(id) {
        const existing = await this.prisma.infografis.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Infografis #${id} tidak ditemukan`);
        try {
            (0, fs_1.unlinkSync)((0, path_1.join)(process.cwd(), existing.imageUrl.replace('/uploads', 'uploads')));
        }
        catch { }
        return this.prisma.infografis.delete({ where: { id } });
    }
};
exports.InfografisService = InfografisService;
exports.InfografisService = InfografisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InfografisService);
//# sourceMappingURL=infografis.service.js.map