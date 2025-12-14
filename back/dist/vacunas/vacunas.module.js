"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacunasModule = void 0;
const common_1 = require("@nestjs/common");
const vacunas_service_1 = require("./vacunas.service");
const vacunas_controller_1 = require("./vacunas.controller");
const typeorm_1 = require("@nestjs/typeorm");
const vacuna_entity_1 = require("./entities/vacuna.entity");
let VacunasModule = class VacunasModule {
};
exports.VacunasModule = VacunasModule;
exports.VacunasModule = VacunasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vacuna_entity_1.Vacuna])],
        controllers: [vacunas_controller_1.VacunasController],
        providers: [vacunas_service_1.VacunasService],
    })
], VacunasModule);
//# sourceMappingURL=vacunas.module.js.map