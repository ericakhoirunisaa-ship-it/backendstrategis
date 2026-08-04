"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const statistik_module_1 = require("./statistik/statistik.module");
const indikator_module_1 = require("./indikator/indikator.module");
const jadwal_rilis_module_1 = require("./jadwal-rilis/jadwal-rilis.module");
const upload_module_1 = require("./upload/upload.module");
const peta_tematik_module_1 = require("./peta-tematik/peta-tematik.module");
const infografis_module_1 = require("./infografis/infografis.module");
const pengaduan_module_1 = require("./pengaduan/pengaduan.module");
const stats_module_1 = require("./stats/stats.module");
const indikator_bulanan_module_1 = require("./indikator-bulanan/indikator-bulanan.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            statistik_module_1.StatistikModule,
            indikator_module_1.IndikatorModule,
            jadwal_rilis_module_1.JadwalRilisModule,
            upload_module_1.UploadModule,
            peta_tematik_module_1.PetaTematikModule,
            infografis_module_1.InfografisModule,
            pengaduan_module_1.PengaduanModule,
            stats_module_1.StatsModule,
            indikator_bulanan_module_1.IndikatorBulananModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map