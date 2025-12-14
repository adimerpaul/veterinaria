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
exports.Tratamiento = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const historiale_entity_1 = require("../../historiales/entities/historiale.entity");
const tratamiento_medicamento_entity_1 = require("../../tratamiento-medicamentos/entities/tratamiento-medicamento.entity");
let Tratamiento = class Tratamiento {
    id;
    observaciones;
    comentario;
    fecha;
    costo;
    pagado;
    user;
    historiale;
    tratamientoMedicamentos;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Tratamiento = Tratamiento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tratamiento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tratamiento.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tratamiento.prototype, "comentario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Tratamiento.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tratamiento.prototype, "costo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Tratamiento.prototype, "pagado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.tratamientos),
    __metadata("design:type", user_entity_1.User)
], Tratamiento.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => historiale_entity_1.Historiale, (historiale) => historiale.tratamientos),
    __metadata("design:type", historiale_entity_1.Historiale)
], Tratamiento.prototype, "historiale", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tratamiento_medicamento_entity_1.TratamientoMedicamento, (tm) => tm.tratamiento, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Tratamiento.prototype, "tratamientoMedicamentos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Tratamiento.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Tratamiento.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Tratamiento.prototype, "deletedAt", void 0);
exports.Tratamiento = Tratamiento = __decorate([
    (0, typeorm_1.Entity)({ name: 'tratamientos' })
], Tratamiento);
//# sourceMappingURL=tratamiento.entity.js.map