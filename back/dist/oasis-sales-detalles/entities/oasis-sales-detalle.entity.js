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
exports.OasisSalesDetalle = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../../users/entities/user.entity");
const oasis_producto_entity_1 = require("../../oasis-productos/entities/oasis-producto.entity");
const oasis_sale_entity_1 = require("../../oasis-sales/entities/oasis-sale.entity");
let OasisSalesDetalle = class OasisSalesDetalle {
    id;
    fecha;
    productoName;
    subtotal;
    precio;
    cantidad;
    anulado;
    createdAt;
    updatedAt;
    deletedAt;
    user;
    oasisSale;
    oasisProducto;
};
exports.OasisSalesDetalle = OasisSalesDetalle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OasisSalesDetalle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], OasisSalesDetalle.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OasisSalesDetalle.prototype, "productoName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OasisSalesDetalle.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OasisSalesDetalle.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], OasisSalesDetalle.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OasisSalesDetalle.prototype, "anulado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], OasisSalesDetalle.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], OasisSalesDetalle.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], OasisSalesDetalle.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sales, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], OasisSalesDetalle.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => oasis_sale_entity_1.OasisSale, (oasisSale) => oasisSale.oasisSalesDetalles, {
        nullable: true,
    }),
    __metadata("design:type", oasis_sale_entity_1.OasisSale)
], OasisSalesDetalle.prototype, "oasisSale", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => oasis_producto_entity_1.OasisProducto, (oasisProducto) => oasisProducto.details, {
        nullable: true,
    }),
    __metadata("design:type", oasis_producto_entity_1.OasisProducto)
], OasisSalesDetalle.prototype, "oasisProducto", void 0);
exports.OasisSalesDetalle = OasisSalesDetalle = __decorate([
    (0, typeorm_1.Entity)('oasissalesdetails')
], OasisSalesDetalle);
//# sourceMappingURL=oasis-sales-detalle.entity.js.map