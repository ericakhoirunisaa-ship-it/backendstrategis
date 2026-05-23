"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetaTematikModule = void 0;
const common_1 = require("@nestjs/common");
const peta_tematik_controller_1 = require("./peta-tematik.controller");
const peta_tematik_service_1 = require("./peta-tematik.service");
let PetaTematikModule = class PetaTematikModule {
};
exports.PetaTematikModule = PetaTematikModule;
exports.PetaTematikModule = PetaTematikModule = __decorate([
    (0, common_1.Module)({
        controllers: [peta_tematik_controller_1.PetaTematikController],
        providers: [peta_tematik_service_1.PetaTematikService],
    })
], PetaTematikModule);
//# sourceMappingURL=peta-tematik.module.js.map