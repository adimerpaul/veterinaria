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
exports.LaboratoriosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const laboratorio_entity_1 = require("./entities/laboratorio.entity");
const typeorm_2 = require("typeorm");
let LaboratoriosService = class LaboratoriosService {
    labRepo;
    constructor(labRepo) {
        this.labRepo = labRepo;
    }
    async create(data) {
        data.fecha = new Date(data.fecha);
        data.user = { id: data.userId };
        data.mascota = { id: data.mascotaId };
        const lab = this.labRepo.create(data);
        return await this.labRepo.save(lab);
    }
    async findAll() {
        return await this.labRepo.find({
            relations: ['user', 'mascota'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        return await this.labRepo.findOne({ where: { id }, relations: ['user', 'mascota'] });
    }
    async remove(id) {
        return await this.labRepo.softDelete(id);
    }
};
exports.LaboratoriosService = LaboratoriosService;
exports.LaboratoriosService = LaboratoriosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(laboratorio_entity_1.Laboratorio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LaboratoriosService);
//# sourceMappingURL=laboratorios.service.js.map