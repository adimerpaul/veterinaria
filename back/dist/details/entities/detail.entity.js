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
exports.Detail = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const mascota_entity_1 = require("../../mascotas/entities/mascota.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const sale_entity_1 = require("../../sales/entities/sale.entity");
const producto_entity_1 = require("../../productos/entities/producto.entity");
let Detail = class Detail {
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
    mascota;
    user;
    sale;
    producto;
};
exports.Detail = Detail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Detail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Detail.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Detail.prototype, "productoName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Detail.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Detail.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Detail.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Detail.prototype, "anulado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], Detail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], Detail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], Detail.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mascota_entity_1.Mascota, (mascota) => mascota.sales, { nullable: true }),
    __metadata("design:type", mascota_entity_1.Mascota)
], Detail.prototype, "mascota", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sales, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], Detail.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sale_entity_1.Sale, (sale) => sale.details, { nullable: true }),
    __metadata("design:type", sale_entity_1.Sale)
], Detail.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, (producto) => producto.details, { nullable: true }),
    __metadata("design:type", producto_entity_1.Producto)
], Detail.prototype, "producto", void 0);
exports.Detail = Detail = __decorate([
    (0, typeorm_1.Entity)('details')
], Detail);
//# sourceMappingURL=detail.entity.js.map