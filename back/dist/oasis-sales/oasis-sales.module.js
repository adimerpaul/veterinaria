"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OasisSalesModule = void 0;
const common_1 = require("@nestjs/common");
const oasis_sales_service_1 = require("./oasis-sales.service");
const oasis_sales_controller_1 = require("./oasis-sales.controller");
const typeorm_1 = require("@nestjs/typeorm");
const oasis_sale_entity_1 = require("./entities/oasis-sale.entity");
const oasis_sales_detalle_entity_1 = require("../oasis-sales-detalles/entities/oasis-sales-detalle.entity");
const oasis_producto_entity_1 = require("../oasis-productos/entities/oasis-producto.entity");
let OasisSalesModule = class OasisSalesModule {
};
exports.OasisSalesModule = OasisSalesModule;
exports.OasisSalesModule = OasisSalesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([oasis_sale_entity_1.OasisSale, oasis_sales_detalle_entity_1.OasisSalesDetalle, oasis_producto_entity_1.OasisProducto]),
        ],
        controllers: [oasis_sales_controller_1.OasisSalesController],
        providers: [oasis_sales_service_1.OasisSalesService],
    })
], OasisSalesModule);
//# sourceMappingURL=oasis-sales.module.js.map