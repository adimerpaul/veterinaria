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
exports.ProductosService = void 0;
const common_1 = require("@nestjs/common");
const producto_entity_1 = require("./entities/producto.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tratamiento_medicamento_entity_1 = require("../tratamiento-medicamentos/entities/tratamiento-medicamento.entity");
let ProductosService = class ProductosService {
    productosRepository;
    tratamientoMedicamentoRepository;
    constructor(productosRepository, tratamientoMedicamentoRepository) {
        this.productosRepository = productosRepository;
        this.tratamientoMedicamentoRepository = tratamientoMedicamentoRepository;
    }
    async create(body) {
        const producto = this.productosRepository.create(body);
        await this.productosRepository.save(producto);
        return producto;
    }
    async findAll(page = 1, limit = 10, filter = '', tipo = '') {
        const query = this.productosRepository.createQueryBuilder('producto');
        if (filter) {
            query.where('producto.nombre LIKE :filter', { filter: `%${filter}%` });
            query.orWhere('producto.codigo LIKE :filter', { filter: `%${filter}%` });
        }
        if (tipo) {
            query.andWhere('producto.tipo = :tipo', { tipo });
        }
        query
            .orderBy('producto.nombre', 'ASC')
            .skip((page - 1) * limit)
            .take(limit);
        const [productos, total] = await query.getManyAndCount();
        return {
            data: productos,
            total,
            last_page: Math.ceil(total / limit),
            current_page: page,
        };
    }
    async update(id, body) {
        await this.productosRepository.update(id, body);
        return await this.productosRepository.findOne({ where: { id } });
    }
    async remove(id) {
        const tm = await this.tratamientoMedicamentoRepository.findOne({
            where: { producto: { id } },
        });
        if (tm) {
            throw new Error('No se puede eliminar el producto porque está asociado a un tratamiento médico');
        }
        await this.productosRepository.softDelete(id);
        return {
            id,
        };
    }
    async findAllProductos() {
        return await this.productosRepository.find();
    }
    async cambiarImagen(id, filename) {
        const producto = await this.productosRepository.findOne({ where: { id } });
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        producto.imagen = filename;
        return await this.productosRepository.save(producto);
    }
};
exports.ProductosService = ProductosService;
exports.ProductosService = ProductosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(1, (0, typeorm_1.InjectRepository)(tratamiento_medicamento_entity_1.TratamientoMedicamento)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductosService);
//# sourceMappingURL=productos.service.js.map