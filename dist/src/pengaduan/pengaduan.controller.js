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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PengaduanController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const pengaduan_service_1 = require("./pengaduan.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const class_validator_1 = require("class-validator");
class UpdatePengaduanDto {
    status;
    catatan;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePengaduanDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePengaduanDto.prototype, "catatan", void 0);
let PengaduanController = class PengaduanController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    async create(files, namaLengkap, noIdentitas, alamat, noTelpon, isiPengaduan) {
        if (!namaLengkap || !noIdentitas || !alamat || !noTelpon || !isiPengaduan) {
            throw new common_1.BadRequestException('Semua field wajib harus diisi');
        }
        if (!files?.fotoIdentitas?.[0]) {
            throw new common_1.BadRequestException('Foto identitas wajib diunggah');
        }
        const fotoIdentitas = `/uploads/pengaduan/${files.fotoIdentitas[0].filename}`;
        const lampiran = files?.lampiran?.[0]
            ? `/uploads/pengaduan/${files.lampiran[0].filename}`
            : undefined;
        return this.service.create({ namaLengkap, noIdentitas, fotoIdentitas, alamat, noTelpon, isiPengaduan, lampiran });
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.PengaduanController = PengaduanController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PengaduanController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PengaduanController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'fotoIdentitas', maxCount: 1 },
        { name: 'lampiran', maxCount: 5 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('namaLengkap')),
    __param(2, (0, common_1.Body)('noIdentitas')),
    __param(3, (0, common_1.Body)('alamat')),
    __param(4, (0, common_1.Body)('noTelpon')),
    __param(5, (0, common_1.Body)('isiPengaduan')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PengaduanController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatePengaduanDto]),
    __metadata("design:returntype", void 0)
], PengaduanController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PengaduanController.prototype, "remove", null);
exports.PengaduanController = PengaduanController = __decorate([
    (0, common_1.Controller)('pengaduan'),
    __metadata("design:paramtypes", [pengaduan_service_1.PengaduanService])
], PengaduanController);
//# sourceMappingURL=pengaduan.controller.js.map