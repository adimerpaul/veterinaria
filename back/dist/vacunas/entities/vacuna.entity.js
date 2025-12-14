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
exports.Vacuna = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const mascota_entity_1 = require("../../mascotas/entities/mascota.entity");
let Vacuna = class Vacuna {
    id;
    fechaVacuna;
    fechaProximaVacuna;
    nombreVacuna;
    dosis;
    observaciones;
    otro;
    createdAt;
    updatedAt;
    deletedAt;
    user;
    mascota;
};
exports.Vacuna = Vacuna;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vacuna.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vacuna.prototype, "fechaVacuna", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vacuna.prototype, "fechaProximaVacuna", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vacuna.prototype, "nombreVacuna", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vacuna.prototype, "dosis", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vacuna.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'No' }),
    __metadata("design:type", String)
], Vacuna.prototype, "otro", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vacuna.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Vacuna.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Vacuna.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.vacunas),
    __metadata("design:type", user_entity_1.User)
], Vacuna.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mascota_entity_1.Mascota, (mascota) => mascota.vacunas),
    __metadata("design:type", mascota_entity_1.Mascota)
], Vacuna.prototype, "mascota", void 0);
exports.Vacuna = Vacuna = __decorate([
    (0, typeorm_1.Entity)('vacunas')
], Vacuna);
//# sourceMappingURL=vacuna.entity.js.map