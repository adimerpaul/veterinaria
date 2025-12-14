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
exports.OasisProductosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const oasis_producto_entity_1 = require("./entities/oasis-producto.entity");
const typeorm_2 = require("typeorm");
let OasisProductosService = class OasisProductosService {
    oasisProductoRepository;
    constructor(oasisProductoRepository) {
        this.oasisProductoRepository = oasisProductoRepository;
    }
    async create(data) {
        const producto = this.oasisProductoRepository.create(data);
        return await this.oasisProductoRepository.save(producto);
    }
    async findAll(params) {
        const { filter = '', tipo = '', page = 1, limit = 20 } = params;
        return await this.oasisProductoRepository
            .createQueryBuilder('producto')
            .where('producto.stock > :stock', { stock: 0 })
            .andWhere('producto.nombre LIKE :filter', { filter: `%${filter}%` })
            .orderBy('producto.nombre', 'ASC')
            .getMany();
    }
    async update(id, data) {
        await this.oasisProductoRepository.update(id, data);
        return await this.oasisProductoRepository.findOne({ where: { id } });
    }
    async remove(id) {
        return await this.oasisProductoRepository.softDelete(id);
    }
    async findOne(id) {
        return await this.oasisProductoRepository.findOne({ where: { id } });
    }
};
exports.OasisProductosService = OasisProductosService;
exports.OasisProductosService = OasisProductosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(oasis_producto_entity_1.OasisProducto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OasisProductosService);
//# sourceMappingURL=oasis-productos.service.js.map