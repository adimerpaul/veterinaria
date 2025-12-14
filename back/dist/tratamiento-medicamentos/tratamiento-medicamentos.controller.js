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
exports.TratamientoMedicamentosController = void 0;
const common_1 = require("@nestjs/common");
const tratamiento_medicamentos_service_1 = require("./tratamiento-medicamentos.service");
const create_tratamiento_medicamento_dto_1 = require("./dto/create-tratamiento-medicamento.dto");
const update_tratamiento_medicamento_dto_1 = require("./dto/update-tratamiento-medicamento.dto");
let TratamientoMedicamentosController = class TratamientoMedicamentosController {
    tratamientoMedicamentosService;
    constructor(tratamientoMedicamentosService) {
        this.tratamientoMedicamentosService = tratamientoMedicamentosService;
    }
    create(createTratamientoMedicamentoDto) {
        return this.tratamientoMedicamentosService.create(createTratamientoMedicamentoDto);
    }
    findAll() {
        return this.tratamientoMedicamentosService.findAll();
    }
    findOne(id) {
        return this.tratamientoMedicamentosService.findOne(+id);
    }
    update(id, updateTratamientoMedicamentoDto) {
        return this.tratamientoMedicamentosService.update(+id, updateTratamientoMedicamentoDto);
    }
    remove(id) {
        return this.tratamientoMedicamentosService.remove(+id);
    }
};
exports.TratamientoMedicamentosController = TratamientoMedicamentosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tratamiento_medicamento_dto_1.CreateTratamientoMedicamentoDto]),
    __metadata("design:returntype", void 0)
], TratamientoMedicamentosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TratamientoMedicamentosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TratamientoMedicamentosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tratamiento_medicamento_dto_1.UpdateTratamientoMedicamentoDto]),
    __metadata("design:returntype", void 0)
], TratamientoMedicamentosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TratamientoMedicamentosController.prototype, "remove", null);
exports.TratamientoMedicamentosController = TratamientoMedicamentosController = __decorate([
    (0, common_1.Controller)('tratamiento-medicamentos'),
    __metadata("design:paramtypes", [tratamiento_medicamentos_service_1.TratamientoMedicamentosService])
], TratamientoMedicamentosController);
//# sourceMappingURL=tratamiento-medicamentos.controller.js.map