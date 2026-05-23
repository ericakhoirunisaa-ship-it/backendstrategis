"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatistikModule = void 0;
const common_1 = require("@nestjs/common");
const statistik_controller_1 = require("./statistik.controller");
const statistik_service_1 = require("./statistik.service");
let StatistikModule = class StatistikModule {
};
exports.StatistikModule = StatistikModule;
exports.StatistikModule = StatistikModule = __decorate([
    (0, common_1.Module)({
        controllers: [statistik_controller_1.StatistikController],
        providers: [statistik_service_1.StatistikService],
    })
], StatistikModule);
//# sourceMappingURL=statistik.module.js.map