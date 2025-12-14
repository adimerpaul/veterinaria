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
exports.User = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const sale_entity_1 = require("../../sales/entities/sale.entity");
const documento_entity_1 = require("../../documentos/entities/documento.entity");
const user_permiso_entity_1 = require("../../user-permisos/entities/user-permiso.entity");
const vacuna_entity_1 = require("../../vacunas/entities/vacuna.entity");
const desparacitacione_entity_1 = require("../../desparacitaciones/entities/desparacitacione.entity");
const historiale_entity_1 = require("../../historiales/entities/historiale.entity");
const tratamiento_entity_1 = require("../../tratamientos/entities/tratamiento.entity");
const foto_entity_1 = require("../../fotos/entities/foto.entity");
const laboratorio_entity_1 = require("../../laboratorios/entities/laboratorio.entity");
const purchase_entity_1 = require("../../purchase/entities/purchase.entity");
const purchase_detail_entity_1 = require("../../purchase-detail/entities/purchase-detail.entity");
let User = class User {
    id;
    name;
    role;
    username;
    password;
    agencia;
    createdAt;
    updatedAt;
    deletedAt;
    sales;
    documentos;
    userPermisos;
    vacunas;
    historiales;
    desparacitaciones;
    tratamientos;
    fotos;
    laboratorios;
    purchases;
    purchaseDetails;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'Oasis' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], User.prototype, "agencia", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_entity_1.Sale, (sale) => sale.user),
    __metadata("design:type", Array)
], User.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => documento_entity_1.Documento, (documento) => documento.user),
    __metadata("design:type", Array)
], User.prototype, "documentos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_permiso_entity_1.UserPermiso, (userPermiso) => userPermiso.user),
    __metadata("design:type", Array)
], User.prototype, "userPermisos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vacuna_entity_1.Vacuna, (vacuna) => vacuna.user),
    __metadata("design:type", Array)
], User.prototype, "vacunas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => historiale_entity_1.Historiale, (historial) => historial.user),
    __metadata("design:type", Array)
], User.prototype, "historiales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => desparacitacione_entity_1.Desparacitacione, (desparacitacione) => desparacitacione.user),
    __metadata("design:type", Array)
], User.prototype, "desparacitaciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tratamiento_entity_1.Tratamiento, (tratamiento) => tratamiento.user),
    __metadata("design:type", Array)
], User.prototype, "tratamientos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => foto_entity_1.Foto, (foto) => foto.user),
    __metadata("design:type", Array)
], User.prototype, "fotos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => laboratorio_entity_1.Laboratorio, (laboratorio) => laboratorio.user),
    __metadata("design:type", Array)
], User.prototype, "laboratorios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchase_entity_1.Purchase, (purchase) => purchase.user),
    __metadata("design:type", Array)
], User.prototype, "purchases", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchase_detail_entity_1.PurchaseDetail, (purchaseDetail) => purchaseDetail.user),
    __metadata("design:type", Array)
], User.prototype, "purchaseDetails", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' }),
    (0, typeorm_1.Unique)(['username'])
], User);
//# sourceMappingURL=user.entity.js.map