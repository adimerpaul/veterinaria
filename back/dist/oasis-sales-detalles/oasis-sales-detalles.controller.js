"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OasisSalesDetallesController = void 0;
const common_1 = require("@nestjs/common");
const oasis_sales_detalles_service_1 = require("./oasis-sales-detalles.service");
const create_oasis_sales_detalle_dto_1 = require("./dto/create-oasis-sales-detalle.dto");
const update_oasis_sales_detalle_dto_1 = require("./dto/update-oasis-sales-detalle.dto");
let OasisSalesDetallesController = class OasisSalesDetallesController {
    oasisSalesDetallesService;
    constructor(oasisSalesDetallesService) {
        this.oasisSalesDetallesService = oasisSalesDetallesService;
    }
    create(createOasisSalesDetalleDto) {
        return this.oasisSalesDetallesService.create(createOasisSalesDetalleDto);
    }
    findAll() {
        return this.oasisSalesDetallesService.findAll();
    }
    findOne(id) {
        return this.oasisSalesDetallesService.findOne(+id);
    }
    update(id, updateOasisSalesDetalleDto) {
        return this.oasisSalesDetallesService.update(+id, updateOasisSalesDetalleDto);
    }
    remove(id) {
        return this.oasisSalesDetallesService.remove(+id);
    }
};
exports.OasisSalesDetallesController = OasisSalesDetallesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_oasis_sales_detalle_dto_1.CreateOasisSalesDetalleDto]),
    __metadata("design:returntype", void 0)
], OasisSalesDetallesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OasisSalesDetallesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OasisSalesDetallesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_oasis_sales_detalle_dto_1.UpdateOasisSalesDetalleDto]),
    __metadata("design:returntype", void 0)
], OasisSalesDetallesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OasisSalesDetallesController.prototype, "remove", null);
exports.OasisSalesDetallesController = OasisSalesDetallesController = __decorate([
    (0, common_1.Controller)('oasis-sales-detalles'),
    __metadata("design:paramtypes", [oasis_sales_detalles_service_1.OasisSalesDetallesService])
], OasisSalesDetallesController);
//# sourceMappingURL=oasis-sales-detalles.controller.js.map