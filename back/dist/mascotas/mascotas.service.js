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
exports.MascotasService = void 0;
const common_1 = require("@nestjs/common");
const mascota_entity_1 = require("./entities/mascota.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const producto_entity_1 = require("../productos/entities/producto.entity");
const detail_entity_1 = require("../details/entities/detail.entity");
const sale_entity_1 = require("../sales/entities/sale.entity");
const historiale_entity_1 = require("../historiales/entities/historiale.entity");
let MascotasService = class MascotasService {
    mascotasRepository;
    productosRepository;
    detailsRepository;
    salesRepository;
    historialesRepository;
    constructor(mascotasRepository, productosRepository, detailsRepository, salesRepository, historialesRepository) {
        this.mascotasRepository = mascotasRepository;
        this.productosRepository = productosRepository;
        this.detailsRepository = detailsRepository;
        this.salesRepository = salesRepository;
        this.historialesRepository = historialesRepository;
    }
    async historialMascota(mascotaId) {
        const historiales = await this.historialesRepository.find({
            where: { mascota: { id: mascotaId } },
            relations: [
                'user',
                'tratamientos',
                'tratamientos.tratamientoMedicamentos',
                'tratamientos.tratamientoMedicamentos.producto',
            ],
            order: { id: 'ASC' },
        });
        if (!historiales) {
            return null;
        }
        return historiales;
    }
    async historial(body) {
        const mascotaId = body.mascotaId;
        console.log('mascotaId');
        const historial = await this.salesRepository.find({
            where: { mascota: { id: mascotaId } },
            relations: ['user', 'mascota', 'details'],
            order: { id: 'DESC' },
        });
        if (!historial) {
            return null;
        }
        console.log('historial');
        return historial;
    }
    async create(body) {
        const mascota = this.mascotasRepository.create(body);
        return await this.mascotasRepository.save(mascota);
    }
    async findAll(page = 1, limit = 10, filter = '') {
        const query = this.mascotasRepository.createQueryBuilder('mascota');
        if (filter) {
            query.where('mascota.nombre LIKE :filter OR mascota.propietario_nombre LIKE :filter', { filter: `%${filter}%` });
        }
        query
            .orderBy('mascota.nombre', 'ASC')
            .skip((page - 1) * limit)
            .take(limit);
        const [mascotas, total] = await query.getManyAndCount();
        return {
            data: mascotas,
            total,
            last_page: Math.ceil(total / limit),
            current_page: page,
        };
    }
    async findOne(id) {
        const mascota = await this.mascotasRepository.findOne({
            where: { id },
            relations: [
                'vacunas',
                'vacunas.user',
                'desparacitaciones',
                'desparacitaciones.user',
                'historiales.user',
                'historiales.tratamientos',
                'historiales.tratamientos.tratamientoMedicamentos',
                'historiales.tratamientos.tratamientoMedicamentos.producto',
                'fotos.user',
                'laboratorios.user',
            ],
        });
        if (!mascota) {
            return null;
        }
        return mascota;
    }
    async update(id, body) {
        await this.mascotasRepository.update(id, body);
        return await this.mascotasRepository.findOne({ where: { id } });
    }
    async remove(id) {
        return await this.mascotasRepository.delete(id);
    }
    async findSales(id) {
        return this.salesRepository.find({
            where: { mascota: { id } },
            relations: ['user', 'details', 'details.producto'],
            order: { createdAt: 'DESC' },
        });
    }
    async findProductosEspeciales(id) {
        const tipos = ['Cirugía', 'Laboratorio', 'Peluqueria', 'Tratamiento'];
        const productosEspaciales = await this.productosRepository.find({
            where: { tipo: (0, typeorm_2.In)(tipos) },
        });
        if (productosEspaciales.length === 0) {
            return [];
        }
        const productosEspacialesMascotas = await this.detailsRepository.find({
            where: {
                producto: (0, typeorm_2.In)(productosEspaciales.map((p) => p.id)),
                mascota: { id },
            },
            relations: ['user', 'producto'],
        });
        return productosEspacialesMascotas;
    }
    async findDocumentos(id) {
        const mascota = await this.mascotasRepository.findOne({
            where: { id },
            relations: ['documentos', 'documentos.user'],
        });
        if (!mascota || !mascota.documentos) {
            return [];
        }
        return mascota.documentos;
    }
};
exports.MascotasService = MascotasService;
exports.MascotasService = MascotasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mascota_entity_1.Mascota)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(2, (0, typeorm_1.InjectRepository)(detail_entity_1.Detail)),
    __param(3, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
    __param(4, (0, typeorm_1.InjectRepository)(historiale_entity_1.Historiale)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MascotasService);
//# sourceMappingURL=mascotas.service.js.map