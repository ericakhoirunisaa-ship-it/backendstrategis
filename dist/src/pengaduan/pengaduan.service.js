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
exports.PengaduanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PengaduanService = class PengaduanService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.pengaduan.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        const p = await this.prisma.pengaduan.findUnique({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException('Pengaduan tidak ditemukan');
        return p;
    }
    create(data) {
        return this.prisma.pengaduan.create({ data });
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.pengaduan.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.pengaduan.delete({ where: { id } });
    }
};
exports.PengaduanService = PengaduanService;
exports.PengaduanService = PengaduanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PengaduanService);
//# sourceMappingURL=pengaduan.service.js.map