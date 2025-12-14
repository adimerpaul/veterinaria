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
exports.VacunasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vacuna_entity_1 = require("./entities/vacuna.entity");
const typeorm_2 = require("typeorm");
const moment = require("moment");
let VacunasService = class VacunasService {
    vacunaRepository;
    constructor(vacunaRepository) {
        this.vacunaRepository = vacunaRepository;
    }
    async create(body, req) {
        body.fechaVacuna = moment().format('YYYY-MM-DD');
        body.mascota = { id: body.mascotaId };
        body.user = { id: req.user.userId };
        const vacuna = this.vacunaRepository.create(body);
        return await this.vacunaRepository.save(vacuna);
    }
    async remove(id) {
        const vacuna = await this.vacunaRepository.findOne({ where: { id } });
        if (!vacuna) {
            throw new Error('Vacuna not found');
        }
        return await this.vacunaRepository.softDelete(id);
    }
    async findProximasVacunas(dias = 7) {
        const hoy = moment().startOf('day');
        const limite = moment().add(dias, 'days').endOf('day');
        return await this.vacunaRepository
            .createQueryBuilder('vacuna')
            .leftJoinAndSelect('vacuna.mascota', 'mascota')
            .leftJoinAndSelect('vacuna.user', 'user')
            .where('vacuna.fechaProximaVacuna BETWEEN :hoy AND :limite', {
            hoy: hoy.format('YYYY-MM-DD'),
            limite: limite.format('YYYY-MM-DD'),
        })
            .orderBy('vacuna.fechaProximaVacuna', 'ASC')
            .getMany();
    }
};
exports.VacunasService = VacunasService;
exports.VacunasService = VacunasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vacuna_entity_1.Vacuna)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VacunasService);
//# sourceMappingURL=vacunas.service.js.map