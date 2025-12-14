"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OasisSalesDetallesModule = void 0;
const common_1 = require("@nestjs/common");
const oasis_sales_detalles_service_1 = require("./oasis-sales-detalles.service");
const oasis_sales_detalles_controller_1 = require("./oasis-sales-detalles.controller");
let OasisSalesDetallesModule = class OasisSalesDetallesModule {
};
exports.OasisSalesDetallesModule = OasisSalesDetallesModule;
exports.OasisSalesDetallesModule = OasisSalesDetallesModule = __decorate([
    (0, common_1.Module)({
        controllers: [oasis_sales_detalles_controller_1.OasisSalesDetallesController],
        providers: [oasis_sales_detalles_service_1.OasisSalesDetallesService],
    })
], OasisSalesDetallesModule);
//# sourceMappingURL=oasis-sales-detalles.module.js.map