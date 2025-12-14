"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reportes_controller_1 = require("./reportes.controller");
const reportes_service_1 = require("./reportes.service");
const user_entity_1 = require("../users/entities/user.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
const sale_entity_1 = require("../sales/entities/sale.entity");
const historiale_entity_1 = require("../historiales/entities/historiale.entity");
const detail_entity_1 = require("../details/entities/detail.entity");
const purchase_detail_entity_1 = require("../purchase-detail/entities/purchase-detail.entity");
let ReportesModule = class ReportesModule {
};
exports.ReportesModule = ReportesModule;
exports.ReportesModule = ReportesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                producto_entity_1.Producto,
                sale_entity_1.Sale,
                historiale_entity_1.Historiale,
                purchase_detail_entity_1.PurchaseDetail,
                detail_entity_1.Detail,
            ]),
        ],
        controllers: [reportes_controller_1.ReportesController],
        providers: [reportes_service_1.ReportesService],
    })
], ReportesModule);
//# sourceMappingURL=reportes.module.js.map