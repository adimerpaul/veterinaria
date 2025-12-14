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
exports.ReportesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const producto_entity_1 = require("../productos/entities/producto.entity");
const detail_entity_1 = require("../details/entities/detail.entity");
const purchase_detail_entity_1 = require("../purchase-detail/entities/purchase-detail.entity");
let ReportesService = class ReportesService {
    productosRepository;
    pdetailRepo;
    sdetailRepo;
    constructor(productosRepository, pdetailRepo, sdetailRepo) {
        this.productosRepository = productosRepository;
        this.pdetailRepo = pdetailRepo;
        this.sdetailRepo = sdetailRepo;
    }
    async almacenPorDia(fecha) {
        if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            const tz = new Date();
            const y = tz.getFullYear();
            const m = String(tz.getMonth() + 1).padStart(2, '0');
            const d = String(tz.getDate()).padStart(2, '0');
            fecha = `${y}-${m}-${d}`;
        }
        const desde = new Date(`${fecha} 00:00:00`);
        const hasta = new Date(`${fecha} 23:59:59`);
        const productos = await this.productosRepository.find({
            where: { tipo: 'Producto' },
            order: { nombre: 'ASC' },
        });
        if (productos.length === 0)
            return [];
        const ids = productos.map((p) => p.id);
        const comprasRows = await this.pdetailRepo
            .createQueryBuilder('pd')
            .select('pd.productoId', 'productoId')
            .addSelect('SUM(pd.cantidad)', 'comprado')
            .where('pd.productoId IN (:...ids)', { ids })
            .andWhere('pd.anulado = 0')
            .andWhere('pd.fecha BETWEEN :desde AND :hasta', { desde, hasta })
            .groupBy('pd.productoId')
            .getRawMany();
        const ventasRows = await this.sdetailRepo
            .createQueryBuilder('sd')
            .select('sd.productoId', 'productoId')
            .addSelect('SUM(sd.cantidad)', 'vendido')
            .where('sd.productoId IN (:...ids)', { ids })
            .andWhere('sd.anulado = 0')
            .andWhere('sd.fecha BETWEEN :desde AND :hasta', { desde, hasta })
            .groupBy('sd.productoId')
            .getRawMany();
        const comprasMap = new Map();
        comprasRows.forEach((r) => comprasMap.set(r.productoId, Number(r.comprado) || 0));
        const ventasMap = new Map();
        ventasRows.forEach((r) => ventasMap.set(r.productoId, Number(r.vendido) || 0));
        return productos.map((p) => ({
            id: p.id,
            codigo: p.codigo ?? '',
            nombre: p.nombre,
            presentacion: p.presentacion ?? '',
            contenido: p.contenido ?? '',
            pc: p.precioCompra ?? null,
            pv: p.precioVenta ?? null,
            stock: p.stock ?? 0,
            comprado: comprasMap.get(p.id) || 0,
            vendido: ventasMap.get(p.id) || 0,
            fecha,
        }));
    }
};
exports.ReportesService = ReportesService;
exports.ReportesService = ReportesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(1, (0, typeorm_1.InjectRepository)(purchase_detail_entity_1.PurchaseDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(detail_entity_1.Detail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportesService);
//# sourceMappingURL=reportes.service.js.map