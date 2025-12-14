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
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const purchase_entity_1 = require("./entities/purchase.entity");
const user_entity_1 = require("../users/entities/user.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
const purchase_detail_entity_1 = require("../purchase-detail/entities/purchase-detail.entity");
let PurchasesService = class PurchasesService {
    purchaseRepo;
    pdetailRepo;
    userRepo;
    productoRepo;
    dataSource;
    constructor(purchaseRepo, pdetailRepo, userRepo, productoRepo, dataSource) {
        this.purchaseRepo = purchaseRepo;
        this.pdetailRepo = pdetailRepo;
        this.userRepo = userRepo;
        this.productoRepo = productoRepo;
        this.dataSource = dataSource;
    }
    async create(body, user) {
        const qr = this.dataSource.createQueryRunner();
        await qr.connect();
        await qr.startTransaction();
        try {
            const userEntity = await qr.manager.findOne(user_entity_1.User, {
                where: { id: user.userId },
            });
            if (!userEntity)
                throw new Error('Usuario no encontrado');
            const total = parseFloat(body.total);
            if (isNaN(total))
                throw new Error('Total inválido');
            const purchase = qr.manager.create(purchase_entity_1.Purchase, {
                tipo: 'Compra',
                pago: body.pago || 'Efectivo',
                comentario: body.comentario || '',
                proveedor: body.proveedor || 'SN',
                fecha: new Date(),
                fechaCreacion: new Date(),
                total,
                anulado: false,
                user: userEntity,
            });
            const savedPurchase = await qr.manager.save(purchase_entity_1.Purchase, purchase);
            const details = [];
            for (const item of body.productos) {
                const producto = await qr.manager.findOne(producto_entity_1.Producto, {
                    where: { id: item.id },
                });
                if (!producto)
                    throw new Error(`Producto ${item.id} no encontrado`);
                const cantidad = parseInt(item.cantidadCompra ?? item.cantidad ?? item.cantidadVenta ?? 0);
                const precio = parseFloat(item.precioCompra ??
                    item.precio ??
                    item.precioVenta ??
                    producto['precioCompra'] ??
                    0);
                if (isNaN(cantidad) || isNaN(precio))
                    throw new Error(`Cantidad o precio inválido en producto ${producto.nombre}`);
                const det = qr.manager.create(purchase_detail_entity_1.PurchaseDetail, {
                    fecha: new Date(),
                    productoName: producto.nombre,
                    cantidad,
                    precio,
                    subtotal: cantidad * precio,
                    anulado: false,
                    user: userEntity,
                    purchase: savedPurchase,
                    producto,
                });
                await qr.manager.save(purchase_detail_entity_1.PurchaseDetail, det);
                details.push(det);
                producto.stock += cantidad;
                await qr.manager.save(producto_entity_1.Producto, producto);
            }
            savedPurchase.details = details;
            await qr.commitTransaction();
            return {
                message: 'Compra registrada exitosamente',
                purchase: savedPurchase,
            };
        }
        catch (e) {
            await qr.rollbackTransaction();
            throw new common_1.InternalServerErrorException(e.message);
        }
        finally {
            await qr.release();
        }
    }
    async findAll(fechaInicio, fechaFin, user_id) {
        const fi = new Date(fechaInicio + ' 00:00:00');
        const ff = new Date(fechaFin + ' 23:59:59');
        const where = { fecha: (0, typeorm_2.Between)(fi, ff) };
        if (user_id)
            where.user = { id: user_id };
        return await this.purchaseRepo.find({
            where,
            relations: ['user', 'details.producto'],
            order: { fecha: 'DESC' },
        });
    }
    async imprimir(body) {
        const fi = new Date(body.fechaInicio + ' 00:00:00');
        const ff = new Date(body.fechaFin + ' 23:59:59');
        const where = { fecha: (0, typeorm_2.Between)(fi, ff), anulado: false };
        if (body.user_id)
            where.user = { id: body.user_id };
        if (body.reporte === 'PRODUCTOS') {
            return await this.pdetailRepo.find({
                where,
                relations: ['user', 'purchase', 'producto'],
                order: { fecha: 'DESC' },
            });
        }
        return await this.purchaseRepo.find({
            where,
            relations: ['user', 'details'],
            order: { fecha: 'DESC' },
        });
    }
    async anular(id) {
        const purchase = await this.purchaseRepo.findOne({
            where: { id },
            relations: ['details.producto'],
        });
        if (!purchase)
            throw new Error('Compra no encontrada');
        if (purchase.anulado)
            return { message: 'La compra ya estaba anulada', purchase };
        purchase.anulado = true;
        for (const d of purchase.details) {
            d.anulado = true;
            await this.pdetailRepo.save(d);
            const prod = await this.productoRepo.findOne({
                where: { id: d.producto.id },
            });
            if (prod) {
                prod.stock = Math.max(0, (prod.stock ?? 0) - d.cantidad);
                await this.productoRepo.save(prod);
            }
        }
        await this.purchaseRepo.save(purchase);
        return { message: 'Compra anulada exitosamente', purchase };
    }
};
exports.PurchasesService = PurchasesService;
exports.PurchasesService = PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purchase_entity_1.Purchase)),
    __param(1, (0, typeorm_1.InjectRepository)(purchase_detail_entity_1.PurchaseDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PurchasesService);
//# sourceMappingURL=purchase.service.js.map