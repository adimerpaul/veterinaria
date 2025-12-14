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
exports.OasisProducto = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const oasis_sales_detalle_entity_1 = require("../../oasis-sales-detalles/entities/oasis-sales-detalle.entity");
let OasisProducto = class OasisProducto {
    id;
    codigo;
    nombre;
    presentacion;
    empresa;
    proveedor;
    contenido;
    tipo;
    precioCompra;
    precioVenta;
    stock;
    activo;
    imagen;
    createdAt;
    updatedAt;
    deletedAt;
    details;
};
exports.OasisProducto = OasisProducto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OasisProducto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OasisProducto.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OasisProducto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OasisProducto.prototype, "presentacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OasisProducto.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OasisProducto.prototype, "proveedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OasisProducto.prototype, "contenido", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'Producto' }),
    __metadata("design:type", String)
], OasisProducto.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OasisProducto.prototype, "precioCompra", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OasisProducto.prototype, "precioVenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], OasisProducto.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OasisProducto.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'imagenes\\default.png' }),
    __metadata("design:type", String)
], OasisProducto.prototype, "imagen", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], OasisProducto.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], OasisProducto.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], OasisProducto.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => oasis_sales_detalle_entity_1.OasisSalesDetalle, (oasisSalesDetalle) => oasisSalesDetalle.oasisProducto),
    __metadata("design:type", Array)
], OasisProducto.prototype, "details", void 0);
exports.OasisProducto = OasisProducto = __decorate([
    (0, typeorm_1.Entity)('oasisproductos')
], OasisProducto);
//# sourceMappingURL=oasis-producto.entity.js.map