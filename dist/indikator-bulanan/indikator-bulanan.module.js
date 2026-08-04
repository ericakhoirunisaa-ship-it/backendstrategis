"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndikatorBulananModule = void 0;
const common_1 = require("@nestjs/common");
const indikator_bulanan_service_1 = require("./indikator-bulanan.service");
const indikator_bulanan_controller_1 = require("./indikator-bulanan.controller");
let IndikatorBulananModule = class IndikatorBulananModule {
};
exports.IndikatorBulananModule = IndikatorBulananModule;
exports.IndikatorBulananModule = IndikatorBulananModule = __decorate([
    (0, common_1.Module)({
        controllers: [indikator_bulanan_controller_1.IndikatorBulananController],
        providers: [indikator_bulanan_service_1.IndikatorBulananService],
    })
], IndikatorBulananModule);
//# sourceMappingURL=indikator-bulanan.module.js.map