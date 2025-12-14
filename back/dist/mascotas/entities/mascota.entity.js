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
exports.Mascota = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const sale_entity_1 = require("../../sales/entities/sale.entity");
const detail_entity_1 = require("../../details/entities/detail.entity");
const documento_entity_1 = require("../../documentos/entities/documento.entity");
const vacuna_entity_1 = require("../../vacunas/entities/vacuna.entity");
const desparacitacione_entity_1 = require("../../desparacitaciones/entities/desparacitacione.entity");
const historiale_entity_1 = require("../../historiales/entities/historiale.entity");
const foto_entity_1 = require("../../fotos/entities/foto.entity");
const laboratorio_entity_1 = require("../../laboratorios/entities/laboratorio.entity");
let Mascota = class Mascota {
    id;
    nombre;
    apellido;
    especie;
    raza;
    sexo;
    fecha_nac;
    edad;
    senas_particulares;
    photo;
    color;
    propietario_nombre;
    propietario_ci;
    propietario_direccion;
    propietario_telefono;
    propietario_ciudad;
    propietario_celular;
    createdAt;
    updatedAt;
    deletedAt;
    sales;
    details;
    documentos;
    vacunas;
    desparacitaciones;
    historiales;
    fotos;
    laboratorios;
};
exports.Mascota = Mascota;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Mascota.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "especie", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "raza", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "sexo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "fecha_nac", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "edad", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "senas_particulares", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'defaultPet.jpg' }),
    __metadata("design:type", String)
], Mascota.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "propietario_nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "propietario_ci", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "propietario_direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "propietario_telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "propietario_ciudad", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "propietario_celular", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], Mascota.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], Mascota.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], Mascota.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_entity_1.Sale, (sale) => sale.mascota),
    __metadata("design:type", Array)
], Mascota.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detail_entity_1.Detail, (detail) => detail.mascota),
    __metadata("design:type", Array)
], Mascota.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => documento_entity_1.Documento, (documento) => documento.mascota),
    __metadata("design:type", Array)
], Mascota.prototype, "documentos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vacuna_entity_1.Vacuna, (vacuna) => vacuna.mascota),
    __metadata("design:type", Array)
], Mascota.prototype, "vacunas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => desparacitacione_entity_1.Desparacitacione, (desparacitacione) => desparacitacione.mascota),
    __metadata("design:type", Array)
], Mascota.prototype, "desparacitaciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => historiale_entity_1.Historiale, (historiale) => historiale.mascota),
    __metadata("design:type", Array)
], Mascota.prototype, "historiales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => foto_entity_1.Foto, (foto) => foto.mascota),
    __metadata("design:type", Array)
], Mascota.prototype, "fotos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => laboratorio_entity_1.Laboratorio, (laboratorio) => laboratorio.mascota),
    __metadata("design:type", Array)
], Mascota.prototype, "laboratorios", void 0);
exports.Mascota = Mascota = __decorate([
    (0, typeorm_1.Entity)('mascotas')
], Mascota);
//# sourceMappingURL=mascota.entity.js.map