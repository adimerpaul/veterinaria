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
exports.ReportesController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
const sale_entity_1 = require("../sales/entities/sale.entity");
const historiale_entity_1 = require("../historiales/entities/historiale.entity");
const reportes_service_1 = require("./reportes.service");
let ReportesController = class ReportesController {
    usersRepository;
    productosRepository;
    ventasRepository;
    historialRepository;
    reportesService;
    constructor(usersRepository, productosRepository, ventasRepository, historialRepository, reportesService) {
        this.usersRepository = usersRepository;
        this.productosRepository = productosRepository;
        this.ventasRepository = ventasRepository;
        this.historialRepository = historialRepository;
        this.reportesService = reportesService;
    }
    async resumen() {
        const total_usuarios = await this.usersRepository.count();
        const total_productos = await this.productosRepository.count();
        const total_ventas = await this.ventasRepository.count();
        const total_historial = await this.historialRepository.count();
        const ventas_por_dia = await this.ventasRepository.query(`
      SELECT DATE_FORMAT(fecha, '%Y-%m-%d') as dia, COUNT(*) as total
      FROM sales
      WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
      GROUP BY dia
      ORDER BY dia
    `);
        return {
            total_usuarios,
            total_productos,
            total_ventas,
            total_historial,
            ventas_por_mes: ventas_por_dia.map((v) => ({
                dia: v.dia,
                total: Number(v.total),
            })),
        };
    }
    async almacenDia(fecha) {
        return this.reportesService.almacenPorDia(fecha);
    }
    async tratamientosPorDoctor(fecha) {
        if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            const now = new Date();
            const y = now.getFullYear();
            const m = String(now.getMonth() + 1).padStart(2, '0');
            const d = String(now.getDate()).padStart(2, '0');
            fecha = `${y}-${m}-${d}`;
        }
        const rows = await this.ventasRepository.query(`
      SELECT
        COALESCE(u.name, u.username, 'Sin Doctor') AS doctor,
        t.id AS tid,
        t.historialeId AS nroFicha,
        COALESCE(t.observaciones, t.comentario, '') AS detalle,
        t.costo,
        tm.medicamento       AS med_nombre,
        tm.cantidad          AS med_cant,
        tm.precio            AS med_precio,
        tm.total             AS med_total,
        p.nombre             AS prod_nombre
      FROM tratamientos t
      LEFT JOIN users u ON u.id = t.userId
      LEFT JOIN tratamiento_medicamentos tm ON tm.tratamientoId = t.id
      LEFT JOIN productos p ON p.id = tm.productoId
      WHERE DATE(t.fecha) = ?
      AND t.deletedAt IS NULL
      ORDER BY doctor ASC, t.fecha ASC, t.id ASC, tm.id ASC
      `, [fecha]);
        const grouped = {};
        const tempMaps = new Map();
        for (const r of rows) {
            const doctor = r.doctor || 'Sin Doctor';
            if (!grouped[doctor]) {
                grouped[doctor] = [];
                tempMaps.set(doctor, new Map());
            }
            const byTid = tempMaps.get(doctor);
            if (!byTid.has(r.tid)) {
                const obj = {
                    nroFicha: r.nroFicha ?? null,
                    detalle: r.detalle ?? '',
                    costo: Number(r.costo ?? 0),
                    medicamentos: [],
                };
                byTid.set(r.tid, obj);
                grouped[doctor].push(obj);
            }
            if (r.med_nombre || r.prod_nombre) {
                byTid.get(r.tid).medicamentos.push({
                    medicamento: r.med_nombre,
                    cantidad: Number(r.med_cant ?? 0),
                    precio: Number(r.med_precio ?? 0),
                    total: Number(r.med_total ?? 0),
                    productoNombre: r.prod_nombre ?? null,
                });
            }
        }
        return grouped;
    }
};
exports.ReportesController = ReportesController;
__decorate([
    (0, common_1.Get)('resumen'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "resumen", null);
__decorate([
    (0, common_1.Get)('almacen-dia'),
    __param(0, (0, common_1.Query)('fecha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "almacenDia", null);
__decorate([
    (0, common_1.Get)('tratamientos-por-doctor'),
    __param(0, (0, common_1.Query)('fecha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "tratamientosPorDoctor", null);
exports.ReportesController = ReportesController = __decorate([
    (0, common_1.Controller)('reportes'),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(2, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
    __param(3, (0, typeorm_1.InjectRepository)(historiale_entity_1.Historiale)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        reportes_service_1.ReportesService])
], ReportesController);
//# sourceMappingURL=reportes.controller.js.map