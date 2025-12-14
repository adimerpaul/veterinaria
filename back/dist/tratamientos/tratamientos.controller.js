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
exports.TratamientosController = void 0;
const common_1 = require("@nestjs/common");
const tratamientos_service_1 = require("./tratamientos.service");
const update_tratamiento_dto_1 = require("./dto/update-tratamiento.dto");
const passport_1 = require("@nestjs/passport");
let TratamientosController = class TratamientosController {
    tratamientosService;
    constructor(tratamientosService) {
        this.tratamientosService = tratamientosService;
    }
    create(body, req) {
        return this.tratamientosService.create(body, req);
    }
    findAll(fecha) {
        return this.tratamientosService.findAllByFecha(fecha);
    }
    update(id, updateTratamientoDto) {
        return this.tratamientosService.update(+id, updateTratamientoDto);
    }
    updatePagado(id, updateTratamientoDto) {
        return this.tratamientosService.updatePagado(+id, updateTratamientoDto);
    }
    remove(id) {
        return this.tratamientosService.remove(+id);
    }
    async getReportePorDoctor(fecha) {
        return this.tratamientosService.reporteTratamientosPorDoctor(fecha);
    }
};
exports.TratamientosController = TratamientosController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", void 0)
], TratamientosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('fecha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TratamientosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tratamiento_dto_1.UpdateTratamientoDto]),
    __metadata("design:returntype", void 0)
], TratamientosController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('pagado/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tratamiento_dto_1.UpdateTratamientoDto]),
    __metadata("design:returntype", void 0)
], TratamientosController.prototype, "updatePagado", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TratamientosController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('reporte-por-doctor'),
    __param(0, (0, common_1.Query)('fecha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TratamientosController.prototype, "getReportePorDoctor", null);
exports.TratamientosController = TratamientosController = __decorate([
    (0, common_1.Controller)('tratamientos'),
    __metadata("design:paramtypes", [tratamientos_service_1.TratamientosService])
], TratamientosController);
//# sourceMappingURL=tratamientos.controller.js.map