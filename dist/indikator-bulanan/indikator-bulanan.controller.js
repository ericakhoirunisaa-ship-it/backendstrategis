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
exports.IndikatorBulananController = void 0;
const common_1 = require("@nestjs/common");
const indikator_bulanan_service_1 = require("./indikator-bulanan.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let IndikatorBulananController = class IndikatorBulananController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(bulan, tahun) {
        return this.service.findAll(bulan ? +bulan : undefined, tahun ? +tahun : undefined);
    }
    findAllAdmin() {
        return this.service.findAllAdmin();
    }
    async findStrategisYears() {
        const years = await this.service.findStrategisYears();
        return { years };
    }
    findCombined(bulan, tahun) {
        return this.service.findCombined(bulan ? +bulan : undefined, tahun ? +tahun : undefined);
    }
    create(body) {
        return this.service.create(body);
    }
    update(id, body) {
        return this.service.update(+id, body);
    }
    remove(id) {
        return this.service.remove(+id);
    }
};
exports.IndikatorBulananController = IndikatorBulananController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('bulan')),
    __param(1, (0, common_1.Query)('tahun')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], IndikatorBulananController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IndikatorBulananController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)('strategis-years'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IndikatorBulananController.prototype, "findStrategisYears", null);
__decorate([
    (0, common_1.Get)('combined'),
    __param(0, (0, common_1.Query)('bulan')),
    __param(1, (0, common_1.Query)('tahun')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], IndikatorBulananController.prototype, "findCombined", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IndikatorBulananController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], IndikatorBulananController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IndikatorBulananController.prototype, "remove", null);
exports.IndikatorBulananController = IndikatorBulananController = __decorate([
    (0, common_1.Controller)('indikator-bulanan'),
    __metadata("design:paramtypes", [indikator_bulanan_service_1.IndikatorBulananService])
], IndikatorBulananController);
//# sourceMappingURL=indikator-bulanan.controller.js.map