"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const purchase_entity_1 = require("./entities/purchase.entity");
const user_entity_1 = require("../users/entities/user.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
const purchase_controller_1 = require("./purchase.controller");
const purchase_service_1 = require("./purchase.service");
const purchase_detail_entity_1 = require("../purchase-detail/entities/purchase-detail.entity");
let PurchasesModule = class PurchasesModule {
};
exports.PurchasesModule = PurchasesModule;
exports.PurchasesModule = PurchasesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([purchase_entity_1.Purchase, purchase_detail_entity_1.PurchaseDetail, user_entity_1.User, producto_entity_1.Producto]),
        ],
        controllers: [purchase_controller_1.PurchasesController],
        providers: [purchase_service_1.PurchasesService],
    })
], PurchasesModule);
//# sourceMappingURL=purchase.module.js.map