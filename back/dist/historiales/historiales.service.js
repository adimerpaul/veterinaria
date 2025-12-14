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
exports.HistorialesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const historiale_entity_1 = require("./entities/historiale.entity");
let HistorialesService = class HistorialesService {
    historialRepo;
    constructor(historialRepo) {
        this.historialRepo = historialRepo;
    }
    async create(data) {
        data.mascota = { id: data.mascotaId };
        const nuevo = this.historialRepo.create(data);
        return this.historialRepo.save(nuevo);
    }
    async update(id, data) {
        const historial = await this.historialRepo.findOne({ where: { id } });
        if (!historial)
            throw new Error('Historial no encontrado');
        Object.assign(historial, data);
        return this.historialRepo.save(historial);
    }
    async remove(id) {
        return this.historialRepo.softDelete(id);
    }
};
exports.HistorialesService = HistorialesService;
exports.HistorialesService = HistorialesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(historiale_entity_1.Historiale)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HistorialesService);
//# sourceMappingURL=historiales.service.js.map