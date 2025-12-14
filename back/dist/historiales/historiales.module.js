"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorialesModule = void 0;
const common_1 = require("@nestjs/common");
const historiales_service_1 = require("./historiales.service");
const historiales_controller_1 = require("./historiales.controller");
const typeorm_1 = require("@nestjs/typeorm");
const historiale_entity_1 = require("./entities/historiale.entity");
let HistorialesModule = class HistorialesModule {
};
exports.HistorialesModule = HistorialesModule;
exports.HistorialesModule = HistorialesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([historiale_entity_1.Historiale])],
        controllers: [historiales_controller_1.HistorialesController],
        providers: [historiales_service_1.HistorialesService],
    })
], HistorialesModule);
//# sourceMappingURL=historiales.module.js.map