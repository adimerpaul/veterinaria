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
exports.Historiale = void 0;
const typeorm_1 = require("typeorm");
const mascota_entity_1 = require("../../mascotas/entities/mascota.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const tratamiento_entity_1 = require("../../tratamientos/entities/tratamiento.entity");
let Historiale = class Historiale {
    id;
    peso;
    anamnesis;
    tr;
    fc;
    fr;
    tllc;
    thc;
    apetito;
    pulso;
    cf;
    parvo;
    hexa;
    octa;
    rabica;
    triple;
    moucosidada;
    esterelizado;
    desparacitacion;
    rayox;
    laboratoti;
    ecografia;
    diagnostico;
    pronostico;
    fecha;
    createdAt;
    updatedAt;
    deletedAt;
    mascota;
    user;
    tratamientos;
};
exports.Historiale = Historiale;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Historiale.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], Historiale.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "anamnesis", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "tr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "fc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "fr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "tllc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "thc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "apetito", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "pulso", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "cf", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "parvo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "hexa", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "octa", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "rabica", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "triple", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "moucosidada", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "esterelizado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "desparacitacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "rayox", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "laboratoti", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "ecografia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "diagnostico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Historiale.prototype, "pronostico", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Historiale.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Historiale.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Historiale.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Historiale.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mascota_entity_1.Mascota, (mascota) => mascota.historiales),
    __metadata("design:type", mascota_entity_1.Mascota)
], Historiale.prototype, "mascota", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.historiales),
    __metadata("design:type", user_entity_1.User)
], Historiale.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tratamiento_entity_1.Tratamiento, (tratamiento) => tratamiento.historiale),
    __metadata("design:type", Array)
], Historiale.prototype, "tratamientos", void 0);
exports.Historiale = Historiale = __decorate([
    (0, typeorm_1.Entity)('historiales')
], Historiale);
//# sourceMappingURL=historiale.entity.js.map