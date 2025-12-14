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
exports.OasisProductosController = void 0;
const common_1 = require("@nestjs/common");
const oasis_productos_service_1 = require("./oasis-productos.service");
const create_oasis_producto_dto_1 = require("./dto/create-oasis-producto.dto");
const update_oasis_producto_dto_1 = require("./dto/update-oasis-producto.dto");
let OasisProductosController = class OasisProductosController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(body) {
        return this.service.create(body);
    }
    findAll(query) {
        return this.service.findAll(query);
    }
    update(id, body) {
        return this.service.update(id, body);
    }
    remove(id) {
        return this.service.remove(id);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
};
exports.OasisProductosController = OasisProductosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_oasis_producto_dto_1.CreateOasisProductoDto]),
    __metadata("design:returntype", void 0)
], OasisProductosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OasisProductosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_oasis_producto_dto_1.UpdateOasisProductoDto]),
    __metadata("design:returntype", void 0)
], OasisProductosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OasisProductosController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OasisProductosController.prototype, "findOne", null);
exports.OasisProductosController = OasisProductosController = __decorate([
    (0, common_1.Controller)('oasis-productos'),
    __metadata("design:paramtypes", [oasis_productos_service_1.OasisProductosService])
], OasisProductosController);
//# sourceMappingURL=oasis-productos.controller.js.map