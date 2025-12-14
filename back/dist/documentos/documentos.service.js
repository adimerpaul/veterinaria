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
exports.DocumentosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const documento_entity_1 = require("./entities/documento.entity");
const typeorm_2 = require("typeorm");
const mascota_entity_1 = require("../mascotas/entities/mascota.entity");
let DocumentosService = class DocumentosService {
    documentoRepository;
    mascotaRepository;
    constructor(documentoRepository, mascotaRepository) {
        this.documentoRepository = documentoRepository;
        this.mascotaRepository = mascotaRepository;
    }
    async create(body, req) {
        console.log(req.user);
        const mascota = await this.mascotaRepository.findOne({ where: { id: body.mascota_id } });
        body.mascota = mascota;
        body.user = { id: req.user.userId };
        const documento = this.documentoRepository.create(body);
        return await this.documentoRepository.save(documento);
    }
    findAll() {
        return `This action returns all documentos`;
    }
    async findOne(id) {
        const documento = await this.documentoRepository.findOne({ where: { id } });
        if (!documento) {
            throw new Error(`Documento con ID ${id} no encontrado`);
        }
        return documento;
    }
    async update(id, body) {
        const documento = await this.documentoRepository.findOne({ where: { id } });
        if (!documento) {
            throw new Error(`Documento con ID ${id} no encontrado`);
        }
        if (body.html !== undefined) {
            documento.html = body.html;
        }
        return await this.documentoRepository.save(documento);
    }
    remove(id) {
        return `This action removes a #${id} documento`;
    }
};
exports.DocumentosService = DocumentosService;
exports.DocumentosService = DocumentosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(documento_entity_1.Documento)),
    __param(1, (0, typeorm_1.InjectRepository)(mascota_entity_1.Mascota)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DocumentosService);
//# sourceMappingURL=documentos.service.js.map