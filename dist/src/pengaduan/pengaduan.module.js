"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PengaduanModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const pengaduan_controller_1 = require("./pengaduan.controller");
const pengaduan_service_1 = require("./pengaduan.service");
let PengaduanModule = class PengaduanModule {
};
exports.PengaduanModule = PengaduanModule;
exports.PengaduanModule = PengaduanModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/pengaduan',
                    filename: (_, file, cb) => {
                        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        cb(null, `${unique}${(0, path_1.extname)(file.originalname)}`);
                    },
                }),
                fileFilter: (_, file, cb) => {
                    const allowed = /jpeg|jpg|png|webp|pdf/;
                    if (allowed.test((0, path_1.extname)(file.originalname).toLowerCase())) {
                        cb(null, true);
                    }
                    else {
                        cb(new Error('Hanya file gambar (JPG/PNG/WEBP) atau PDF yang diizinkan'), false);
                    }
                },
                limits: { fileSize: 10 * 1024 * 1024 },
            }),
        ],
        controllers: [pengaduan_controller_1.PengaduanController],
        providers: [pengaduan_service_1.PengaduanService],
    })
], PengaduanModule);
//# sourceMappingURL=pengaduan.module.js.map