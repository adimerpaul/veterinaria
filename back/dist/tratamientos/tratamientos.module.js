"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TratamientosModule = void 0;
const common_1 = require("@nestjs/common");
const tratamientos_service_1 = require("./tratamientos.service");
const tratamientos_controller_1 = require("./tratamientos.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tratamiento_entity_1 = require("./entities/tratamiento.entity");
const tratamiento_medicamento_entity_1 = require("../tratamiento-medicamentos/entities/tratamiento-medicamento.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
let TratamientosModule = class TratamientosModule {
};
exports.TratamientosModule = TratamientosModule;
exports.TratamientosModule = TratamientosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tratamiento_entity_1.Tratamiento, tratamiento_medicamento_entity_1.TratamientoMedicamento, producto_entity_1.Producto]),
        ],
        controllers: [tratamientos_controller_1.TratamientosController],
        providers: [tratamientos_service_1.TratamientosService],
    })
], TratamientosModule);
//# sourceMappingURL=tratamientos.module.js.map