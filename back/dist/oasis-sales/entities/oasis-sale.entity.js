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
exports.OasisSale = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../../users/entities/user.entity");
const oasis_sales_detalle_entity_1 = require("../../oasis-sales-detalles/entities/oasis-sales-detalle.entity");
let OasisSale = class OasisSale {
    id;
    tipo;
    comentarioDoctor;
    fecha;
    fechaCreacion;
    facturado;
    nombre;
    comentario;
    ci;
    total;
    anulado;
    createdAt;
    updatedAt;
    deletedAt;
    user;
    oasisSalesDetalles;
};
exports.OasisSale = OasisSale;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OasisSale.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'Venta' }),
    __metadata("design:type", String)
], OasisSale.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '' }),
    __metadata("design:type", String)
], OasisSale.prototype, "comentarioDoctor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], OasisSale.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], OasisSale.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], OasisSale.prototype, "facturado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OasisSale.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], OasisSale.prototype, "comentario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OasisSale.prototype, "ci", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OasisSale.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OasisSale.prototype, "anulado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], OasisSale.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], OasisSale.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], OasisSale.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sales, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], OasisSale.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => oasis_sales_detalle_entity_1.OasisSalesDetalle, (oasisSalesDetalle) => oasisSalesDetalle.oasisSale),
    __metadata("design:type", Array)
], OasisSale.prototype, "oasisSalesDetalles", void 0);
exports.OasisSale = OasisSale = __decorate([
    (0, typeorm_1.Entity)('oasissales')
], OasisSale);
//# sourceMappingURL=oasis-sale.entity.js.map