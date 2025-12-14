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
exports.VacunasController = void 0;
const common_1 = require("@nestjs/common");
const vacunas_service_1 = require("./vacunas.service");
const passport_1 = require("@nestjs/passport");
let VacunasController = class VacunasController {
    vacunasService;
    constructor(vacunasService) {
        this.vacunasService = vacunasService;
    }
    create(body, req) {
        return this.vacunasService.create(body, req);
    }
    remove(id) {
        return this.vacunasService.remove(+id);
    }
    async getProximasVacunas(dias = 7) {
        return this.vacunasService.findProximasVacunas(dias);
    }
};
exports.VacunasController = VacunasController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", void 0)
], VacunasController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VacunasController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('proximas'),
    __param(0, (0, common_1.Query)('dias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VacunasController.prototype, "getProximasVacunas", null);
exports.VacunasController = VacunasController = __decorate([
    (0, common_1.Controller)('vacunas'),
    __metadata("design:paramtypes", [vacunas_service_1.VacunasService])
], VacunasController);
//# sourceMappingURL=vacunas.controller.js.map