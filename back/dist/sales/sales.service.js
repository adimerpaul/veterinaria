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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const sale_entity_1 = require("./entities/sale.entity");
const typeorm_1 = require("@nestjs/typeorm");
const producto_entity_1 = require("../productos/entities/producto.entity");
const typeorm_2 = require("typeorm");
const detail_entity_1 = require("../details/entities/detail.entity");
const mascota_entity_1 = require("../mascotas/entities/mascota.entity");
const user_entity_1 = require("../users/entities/user.entity");
const common_2 = require("@nestjs/common");
let SalesService = class SalesService {
    salesRepository;
    detailRepository;
    mascotaRepository;
    userRepository;
    productoRepository;
    dataSource;
    constructor(salesRepository, detailRepository, mascotaRepository, userRepository, productoRepository, dataSource) {
        this.salesRepository = salesRepository;
        this.detailRepository = detailRepository;
        this.mascotaRepository = mascotaRepository;
        this.userRepository = userRepository;
        this.productoRepository = productoRepository;
        this.dataSource = dataSource;
    }
    async imprimir(body) {
        try {
            const fechaInicioDate = new Date(body.fechaInicio + ' 00:00:00');
            const fechaFinDate = new Date(body.fechaFin + ' 23:59:59');
            const whereCondition = {
                fecha: (0, typeorm_2.Between)(fechaInicioDate, fechaFinDate),
                anulado: false,
            };
            if (body.user_id) {
                whereCondition['user'] = { id: body.user_id };
            }
            const reporte = body.reporte;
            if (reporte === 'CAJA') {
                const sales = await this.salesRepository.find({
                    where: whereCondition,
                    relations: ['user', 'mascota', 'details'],
                    order: {
                        fecha: 'DESC',
                    },
                });
                return sales;
            }
            if (reporte === 'PRODUCTOS') {
                const details = await this.detailRepository.find({
                    where: whereCondition,
                    relations: ['user', 'mascota', 'sale', 'producto'],
                    order: {
                        fecha: 'DESC',
                    },
                });
                return details;
            }
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async anular(id) {
        try {
            const sale = await this.salesRepository.findOne({
                where: { id: id },
                relations: ['details.producto'],
            });
            if (!sale) {
                throw new Error('Venta no encontrada');
            }
            sale.anulado = true;
            for (const detail of sale.details) {
                detail.anulado = true;
                await this.detailRepository.save(detail);
                console.log(detail);
                const producto = await this.productoRepository.findOne({
                    where: { id: detail.producto.id },
                });
                if (producto) {
                    producto.stock += detail.cantidad;
                    await this.productoRepository.save(producto);
                }
            }
            await this.salesRepository.save(sale);
            return { message: 'Venta anulada exitosamente', sale: sale };
        }
        catch (error) {
            throw Error(`Error al anular la venta: ${error.message}`);
        }
    }
    async create(body, user) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const mascota = await queryRunner.manager.findOne(mascota_entity_1.Mascota, {
                where: { id: body.mascota.id },
            });
            if (!mascota)
                throw new Error('Mascota no encontrada');
            const userEntity = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { id: user.userId },
            });
            if (!userEntity)
                throw new Error('Usuario no encontrado');
            const total = parseFloat(body.total);
            if (isNaN(total))
                throw new Error('Total inválido');
            const sale = queryRunner.manager.create(sale_entity_1.Sale, {
                tipo: 'Venta',
                fecha: new Date(),
                fechaCreacion: new Date(),
                facturado: false,
                nombre: mascota.propietario_nombre,
                total,
                anulado: false,
                comentarioDoctor: body.comentarioDoctor,
                pago: body.pago,
                mascota,
                user: userEntity,
            });
            const savedSale = await queryRunner.manager.save(sale_entity_1.Sale, sale);
            const details = [];
            for (const product of body.productos) {
                const producto = await queryRunner.manager.findOne(producto_entity_1.Producto, {
                    where: { id: product.id },
                });
                if (!producto)
                    throw new Error(`Producto con ID ${product.id} no encontrado`);
                const precio = parseFloat(product.precioVenta);
                const cantidad = parseInt(product.cantidadVenta);
                if (isNaN(precio) || isNaN(cantidad)) {
                    throw new Error(`Precio o cantidad inválida para producto ${product.id}`);
                }
                const detail = queryRunner.manager.create(detail_entity_1.Detail, {
                    fecha: new Date(),
                    productoName: producto.nombre,
                    cantidad,
                    precio,
                    subtotal: precio * cantidad,
                    anulado: false,
                    mascota,
                    user: userEntity,
                    sale: savedSale,
                    producto,
                });
                await queryRunner.manager.save(detail_entity_1.Detail, detail);
                details.push(detail);
                producto.stock -= cantidad;
                await queryRunner.manager.save(producto_entity_1.Producto, producto);
            }
            savedSale.details = details;
            await queryRunner.commitTransaction();
            return {
                message: 'Venta registrada exitosamente',
                sale: savedSale,
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_2.InternalServerErrorException(error.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll(fechaInicio, fechaFin, user_id) {
        const fechaInicioDate = new Date(fechaInicio + ' 00:00:00');
        const fechaFinDate = new Date(fechaFin + ' 23:59:59');
        const whereCondition = {
            fecha: (0, typeorm_2.Between)(fechaInicioDate, fechaFinDate),
        };
        if (user_id) {
            whereCondition['user'] = { id: user_id };
        }
        const sales = await this.salesRepository.find({
            where: whereCondition,
            relations: ['user', 'mascota', 'details.producto'],
            order: {
                fecha: 'DESC',
            },
        });
        return sales;
    }
    findOne(id) {
        return `This action returns a #${id} sale`;
    }
    update(id, updateSaleDto) {
        return `This action updates a #${id} sale`;
    }
    remove(id) {
        return `This action removes a #${id} sale`;
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
    __param(1, (0, typeorm_1.InjectRepository)(detail_entity_1.Detail)),
    __param(2, (0, typeorm_1.InjectRepository)(mascota_entity_1.Mascota)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], SalesService);
//# sourceMappingURL=sales.service.js.map