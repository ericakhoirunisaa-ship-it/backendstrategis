"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfografisModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const infografis_controller_1 = require("./infografis.controller");
const infografis_service_1 = require("./infografis.service");
let InfografisModule = class InfografisModule {
};
exports.InfografisModule = InfografisModule;
exports.InfografisModule = InfografisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/infografis',
                    filename: (_, file, cb) => {
                        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        cb(null, `${unique}${(0, path_1.extname)(file.originalname)}`);
                    },
                }),
                fileFilter: (_, file, cb) => {
                    const allowed = /jpeg|jpg|png|webp|gif/;
                    if (allowed.test((0, path_1.extname)(file.originalname).toLowerCase())) {
                        cb(null, true);
                    }
                    else {
                        cb(new Error('Hanya file gambar yang diizinkan'), false);
                    }
                },
                limits: { fileSize: 5 * 1024 * 1024 },
            }),
        ],
        controllers: [infografis_controller_1.InfografisController],
        providers: [infografis_service_1.InfografisService],
    })
], InfografisModule);
//# sourceMappingURL=infografis.module.js.map