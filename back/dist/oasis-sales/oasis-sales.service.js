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
exports.OasisSalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const oasis_sale_entity_1 = require("./entities/oasis-sale.entity");
const oasis_sales_detalle_entity_1 = require("../oasis-sales-detalles/entities/oasis-sales-detalle.entity");
const oasis_producto_entity_1 = require("../oasis-productos/entities/oasis-producto.entity");
let OasisSalesService = class OasisSalesService {
    oasisSaleRepo;
    oasisDetalleRepo;
    oasisProductoRepo;
    constructor(oasisSaleRepo, oasisDetalleRepo, oasisProductoRepo) {
        this.oasisSaleRepo = oasisSaleRepo;
        this.oasisDetalleRepo = oasisDetalleRepo;
        this.oasisProductoRepo = oasisProductoRepo;
    }
    async create(createOasisSaleDto) {
        const { productos, total, comentario, nombre, ci } = createOasisSaleDto;
        const venta = this.oasisSaleRepo.create({
            total,
            comentario,
            nombre,
            ci,
            user: { id: createOasisSaleDto.userId },
            fecha: new Date(),
            anulado: false,
        });
        const savedVenta = await this.oasisSaleRepo.save(venta);
        const detalles = [];
        for (const p of productos) {
            const producto = await this.oasisProductoRepo.findOne({
                where: { id: p.id },
            });
            if (!producto) {
                throw new Error(`Producto con ID ${p.id} no encontrado`);
            }
            producto.stock -= p.cantidadVenta;
            await this.oasisProductoRepo.save(producto);
            const detalle = new oasis_sales_detalle_entity_1.OasisSalesDetalle();
            detalle.productoName = producto.nombre;
            detalle.precio = p.precioVenta;
            detalle.cantidad = p.cantidadVenta;
            detalle.subtotal = p.precioVenta * p.cantidadVenta;
            detalle.fecha = new Date();
            detalle.oasisSale = savedVenta;
            detalle.oasisProducto = producto;
            detalle.anulado = false;
            detalles.push(detalle);
        }
        await this.oasisDetalleRepo.save(detalles);
        return { sale: savedVenta, detalles };
    }
    async findAll(filters) {
        const { fechaInicio, fechaFin, userId } = filters || {};
        const qb = this.oasisSaleRepo
            .createQueryBuilder('s')
            .leftJoinAndSelect('s.user', 'user')
            .leftJoinAndSelect('s.oasisSalesDetalles', 'oasisSalesDetalles')
            .orderBy('s.fecha', 'DESC');
        if (fechaInicio && fechaFin) {
            qb.andWhere('DATE(s.fecha) BETWEEN :fi AND :ff', { fi: fechaInicio, ff: fechaFin });
        }
        else if (fechaInicio) {
            qb.andWhere('DATE(s.fecha) = :fi', { fi: fechaInicio });
        }
        else if (fechaFin) {
            qb.andWhere('DATE(s.fecha) = :ff', { ff: fechaFin });
        }
        if (typeof userId === 'number' && !Number.isNaN(userId)) {
            qb.andWhere('user.id = :uid', { uid: userId });
        }
        return qb.getMany();
    }
    async findOne(id) {
        return this.oasisSaleRepo.findOne({
            where: { id },
            relations: ['user', 'oasisSalesDetalles'],
        });
    }
    async remove(id) {
        const venta = await this.oasisSaleRepo.findOne({ where: { id } });
        if (!venta)
            throw new Error('No se encontró la venta');
        await this.oasisSaleRepo.softDelete(id);
        return 'Venta eliminada';
    }
    async anular(id, userId) {
        const venta = await this.oasisSaleRepo.findOne({ where: { id } });
        if (!venta)
            throw new Error('No se encontró la venta');
        if (venta.anulado) {
            throw new Error('La venta ya está anulada');
        }
        venta.anulado = true;
        const detalles = await this.oasisDetalleRepo.find({
            where: { oasisSale: { id: venta.id } },
            relations: ['oasisProducto'],
        });
        for (const detalle of detalles) {
            const producto = await this.oasisProductoRepo.findOne({
                where: { id: detalle.oasisProducto.id },
            });
            if (producto) {
                producto.stock += detalle.cantidad;
                await this.oasisProductoRepo.save(producto);
            }
        }
        await this.oasisSaleRepo.save(venta);
        return 'Venta anulada correctamente';
    }
};
exports.OasisSalesService = OasisSalesService;
exports.OasisSalesService = OasisSalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(oasis_sale_entity_1.OasisSale)),
    __param(1, (0, typeorm_1.InjectRepository)(oasis_sales_detalle_entity_1.OasisSalesDetalle)),
    __param(2, (0, typeorm_1.InjectRepository)(oasis_producto_entity_1.OasisProducto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OasisSalesService);
//# sourceMappingURL=oasis-sales.service.js.map