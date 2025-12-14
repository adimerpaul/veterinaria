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
exports.DesparacitacionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment = require("moment");
const desparacitacione_entity_1 = require("./entities/desparacitacione.entity");
let DesparacitacionesService = class DesparacitacionesService {
    desparasitacionRepository;
    constructor(desparasitacionRepository) {
        this.desparasitacionRepository = desparasitacionRepository;
    }
    async create(body, req) {
        body.fecha = moment().format('YYYY-MM-DD');
        body.mascota = { id: body.mascotaId };
        body.user = { id: req.user.userId };
        const desparasitacion = this.desparasitacionRepository.create(body);
        return await this.desparasitacionRepository.save(desparasitacion);
    }
    async remove(id) {
        const desparasitacion = await this.desparasitacionRepository.findOne({
            where: { id },
        });
        if (!desparasitacion) {
            throw new Error('Desparasitación no encontrada');
        }
        return await this.desparasitacionRepository.softDelete(id);
    }
};
exports.DesparacitacionesService = DesparacitacionesService;
exports.DesparacitacionesService = DesparacitacionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(desparacitacione_entity_1.Desparacitacione)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DesparacitacionesService);
//# sourceMappingURL=desparacitaciones.service.js.map