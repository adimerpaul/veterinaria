"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OasisProductosModule = void 0;
const common_1 = require("@nestjs/common");
const oasis_productos_service_1 = require("./oasis-productos.service");
const oasis_productos_controller_1 = require("./oasis-productos.controller");
const oasis_producto_entity_1 = require("./entities/oasis-producto.entity");
const typeorm_1 = require("@nestjs/typeorm");
let OasisProductosModule = class OasisProductosModule {
};
exports.OasisProductosModule = OasisProductosModule;
exports.OasisProductosModule = OasisProductosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([oasis_producto_entity_1.OasisProducto])],
        controllers: [oasis_productos_controller_1.OasisProductosController],
        providers: [oasis_productos_service_1.OasisProductosService],
    })
], OasisProductosModule);
//# sourceMappingURL=oasis-productos.module.js.map