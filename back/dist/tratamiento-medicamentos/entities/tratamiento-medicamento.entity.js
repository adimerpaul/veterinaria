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
exports.TratamientoMedicamento = void 0;
const typeorm_1 = require("typeorm");
const tratamiento_entity_1 = require("../../tratamientos/entities/tratamiento.entity");
const producto_entity_1 = require("../../productos/entities/producto.entity");
let TratamientoMedicamento = class TratamientoMedicamento {
    id;
    medicamento;
    precio;
    cantidad;
    total;
    fecha;
    tratamiento;
    createdAt;
    updatedAt;
    deletedAt;
    producto;
};
exports.TratamientoMedicamento = TratamientoMedicamento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TratamientoMedicamento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TratamientoMedicamento.prototype, "medicamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], TratamientoMedicamento.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], TratamientoMedicamento.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], TratamientoMedicamento.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TratamientoMedicamento.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tratamiento_entity_1.Tratamiento, (tratamiento) => tratamiento.tratamientoMedicamentos),
    __metadata("design:type", tratamiento_entity_1.Tratamiento)
], TratamientoMedicamento.prototype, "tratamiento", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TratamientoMedicamento.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TratamientoMedicamento.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], TratamientoMedicamento.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, (producto) => producto.tratamientoMedicamentos),
    __metadata("design:type", producto_entity_1.Producto)
], TratamientoMedicamento.prototype, "producto", void 0);
exports.TratamientoMedicamento = TratamientoMedicamento = __decorate([
    (0, typeorm_1.Entity)({ name: 'tratamiento_medicamentos' })
], TratamientoMedicamento);
//# sourceMappingURL=tratamiento-medicamento.entity.js.map