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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermisosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permiso_entity_1 = require("./entities/permiso.entity");
const typeorm_2 = require("typeorm");
const user_permiso_entity_1 = require("../user-permisos/entities/user-permiso.entity");
let PermisosService = class PermisosService {
    permisosRepository;
    userPermisosRepository;
    constructor(permisosRepository, userPermisosRepository) {
        this.permisosRepository = permisosRepository;
        this.userPermisosRepository = userPermisosRepository;
    }
    async create(body) {
        const user_id = body.user_id;
        const permissions = body.permissions;
        await this.userPermisosRepository.delete({ userId: user_id });
        for (const permission of permissions) {
            const userPermiso = this.userPermisosRepository.create({
                userId: user_id,
                permisoId: permission,
            });
            await this.userPermisosRepository.save(userPermiso);
        }
    }
    async findAll() {
        const permisos = await this.permisosRepository.find();
        return permisos.map((permiso) => {
            return {
                id: permiso.id,
                nombre: permiso.nombre,
            };
        });
    }
    findOne(id) {
        return `This action returns a #${id} permiso`;
    }
    update(id, updatePermisoDto) {
        return `This action updates a #${id} permiso`;
    }
    remove(id) {
        return `This action removes a #${id} permiso`;
    }
};
exports.PermisosService = PermisosService;
exports.PermisosService = PermisosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permiso_entity_1.Permiso)),
    __param(1, (0, typeorm_1.InjectRepository)(user_permiso_entity_1.UserPermiso)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PermisosService);
//# sourceMappingURL=permisos.service.js.map