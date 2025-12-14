"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesparacitacionesModule = void 0;
const common_1 = require("@nestjs/common");
const desparacitaciones_service_1 = require("./desparacitaciones.service");
const desparacitaciones_controller_1 = require("./desparacitaciones.controller");
const typeorm_1 = require("@nestjs/typeorm");
const desparacitacione_entity_1 = require("./entities/desparacitacione.entity");
let DesparacitacionesModule = class DesparacitacionesModule {
};
exports.DesparacitacionesModule = DesparacitacionesModule;
exports.DesparacitacionesModule = DesparacitacionesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([desparacitacione_entity_1.Desparacitacione])],
        controllers: [desparacitaciones_controller_1.DesparacitacionesController],
        providers: [desparacitaciones_service_1.DesparacitacionesService],
    })
], DesparacitacionesModule);
//# sourceMappingURL=desparacitaciones.module.js.map