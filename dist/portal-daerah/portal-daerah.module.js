"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalDaerahModule = void 0;
const common_1 = require("@nestjs/common");
const portal_daerah_controller_1 = require("./portal-daerah.controller");
const portal_daerah_service_1 = require("./portal-daerah.service");
let PortalDaerahModule = class PortalDaerahModule {
};
exports.PortalDaerahModule = PortalDaerahModule;
exports.PortalDaerahModule = PortalDaerahModule = __decorate([
    (0, common_1.Module)({
        controllers: [portal_daerah_controller_1.PortalDaerahController],
        providers: [portal_daerah_service_1.PortalDaerahService],
    })
], PortalDaerahModule);
//# sourceMappingURL=portal-daerah.module.js.map