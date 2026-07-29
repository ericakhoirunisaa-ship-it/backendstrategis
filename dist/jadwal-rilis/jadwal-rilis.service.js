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
exports.JadwalRilisService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let JadwalRilisService = class JadwalRilisService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.jadwalRilis.findMany({ orderBy: { tanggal: 'asc' } });
    }
    findUpcoming() {
        return this.prisma.jadwalRilis.findMany({
            where: { tanggal: { gte: new Date() } },
            orderBy: { tanggal: 'asc' },
            take: 6,
        });
    }
    async create(data) {
        return this.prisma.jadwalRilis.create({ data });
    }
    async update(id, data) {
        const existing = await this.prisma.jadwalRilis.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Jadwal #${id} tidak ditemukan`);
        return this.prisma.jadwalRilis.update({ where: { id }, data });
    }
    async remove(id) {
        const existing = await this.prisma.jadwalRilis.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Jadwal #${id} tidak ditemukan`);
        return this.prisma.jadwalRilis.delete({ where: { id } });
    }
};
exports.JadwalRilisService = JadwalRilisService;
exports.JadwalRilisService = JadwalRilisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JadwalRilisService);
//# sourceMappingURL=jadwal-rilis.service.js.map