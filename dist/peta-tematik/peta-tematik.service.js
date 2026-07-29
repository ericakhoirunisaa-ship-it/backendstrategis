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
exports.PetaTematikService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PetaTematikService = class PetaTematikService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.petaTematik.findMany({
            include: { indikator: { select: { id: true, nama: true, slug: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const peta = await this.prisma.petaTematik.findUnique({
            where: { id },
            include: { indikator: true },
        });
        if (!peta)
            throw new common_1.NotFoundException(`Peta #${id} tidak ditemukan`);
        return peta;
    }
    create(data) {
        return this.prisma.petaTematik.create({ data });
    }
    async update(id, data) {
        const existing = await this.prisma.petaTematik.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Peta #${id} tidak ditemukan`);
        return this.prisma.petaTematik.update({ where: { id }, data });
    }
    async remove(id) {
        const existing = await this.prisma.petaTematik.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Peta #${id} tidak ditemukan`);
        return this.prisma.petaTematik.delete({ where: { id } });
    }
};
exports.PetaTematikService = PetaTematikService;
exports.PetaTematikService = PetaTematikService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PetaTematikService);
//# sourceMappingURL=peta-tematik.service.js.map