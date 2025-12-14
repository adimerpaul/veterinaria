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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const mascota_entity_1 = require("../../mascotas/entities/mascota.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const detail_entity_1 = require("../../details/entities/detail.entity");
let Sale = class Sale {
    id;
    tipo;
    pago;
    comentarioDoctor;
    fecha;
    fechaCreacion;
    facturado;
    nombre;
    ci;
    total;
    anulado;
    createdAt;
    updatedAt;
    deletedAt;
    mascota;
    user;
    details;
};
exports.Sale = Sale;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sale.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'Venta' }),
    __metadata("design:type", String)
], Sale.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'Efectivo' }),
    __metadata("design:type", String)
], Sale.prototype, "pago", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '' }),
    __metadata("design:type", String)
], Sale.prototype, "comentarioDoctor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Sale.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Sale.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Sale.prototype, "facturado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "ci", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Sale.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Sale.prototype, "anulado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], Sale.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], Sale.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], Sale.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mascota_entity_1.Mascota, (mascota) => mascota.sales, { nullable: true }),
    __metadata("design:type", mascota_entity_1.Mascota)
], Sale.prototype, "mascota", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sales, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], Sale.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detail_entity_1.Detail, (detail) => detail.sale),
    __metadata("design:type", Array)
], Sale.prototype, "details", void 0);
exports.Sale = Sale = __decorate([
    (0, typeorm_1.Entity)('sales')
], Sale);
//# sourceMappingURL=sale.entity.js.map