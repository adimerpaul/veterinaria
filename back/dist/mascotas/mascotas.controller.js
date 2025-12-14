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
exports.MascotasController = void 0;
const common_1 = require("@nestjs/common");
const mascotas_service_1 = require("./mascotas.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const sharp = require("sharp");
const fs = require("node:fs");
let MascotasController = class MascotasController {
    mascotasService;
    constructor(mascotasService) {
        this.mascotasService = mascotasService;
    }
    async historial(id) {
        return this.mascotasService.historialMascota(id);
    }
    async create(body, file) {
        if (file) {
            const compressedFilename = `compressed-${file.filename}`;
            const compressedPath = `./uploads/${compressedFilename}`;
            await sharp(file.path)
                .resize(500)
                .jpeg({ quality: 70 })
                .toFile(compressedPath);
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error al eliminar archivo:', err);
                }
                else {
                    console.log('Archivo eliminado correctamente');
                }
            });
            body.photo = compressedFilename;
        }
        else {
            body.photo = 'defaultPet.jpg';
        }
        return this.mascotasService.create(body);
    }
    async createHistorial(body) {
        return this.mascotasService.historial(body);
    }
    findAll(page = 1, limit = 10, filter = '') {
        return this.mascotasService.findAll(Number(page), Number(limit), filter);
    }
    findOne(id) {
        return this.mascotasService.findOne(+id);
    }
    async update(id, body, file) {
        if (file) {
            const compressedFilename = `compressed-${file.filename}`;
            const compressedPath = `./uploads/${compressedFilename}`;
            await sharp(file.path)
                .resize(350)
                .jpeg({ quality: 70 })
                .toFile(compressedPath);
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error al eliminar archivo:', err);
                }
                else {
                    console.log('Archivo eliminado correctamente');
                }
            });
            body.photo = compressedFilename;
        }
        else {
            delete body.photo;
        }
        return this.mascotasService.update(id, body);
    }
    remove(id) {
        return this.mascotasService.remove(+id);
    }
    findSales(id) {
        return this.mascotasService.findSales(+id);
    }
    findProductosEspeciales(id) {
        return this.mascotasService.findProductosEspeciales(+id);
    }
    findDocumentos(id) {
        return this.mascotasService.findDocumentos(+id);
    }
    async getBase64(id) {
        const mascota = await this.mascotasService.findOne(+id);
        if (mascota && mascota.photo) {
            const filePath = `./uploads/${mascota.photo}`;
            const fileBuffer = fs.readFileSync(filePath);
            const base64Image = fileBuffer.toString('base64');
            return `data:image/jpeg;base64,${base64Image}`;
        }
        return null;
    }
};
exports.MascotasController = MascotasController;
__decorate([
    (0, common_1.Get)('historiales/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MascotasController.prototype, "historial", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MascotasController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('historial'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MascotasController.prototype, "createHistorial", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], MascotasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MascotasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], MascotasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MascotasController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/sales'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MascotasController.prototype, "findSales", null);
__decorate([
    (0, common_1.Get)(':id/productos-especiales'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MascotasController.prototype, "findProductosEspeciales", null);
__decorate([
    (0, common_1.Get)(':id/documentos'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MascotasController.prototype, "findDocumentos", null);
__decorate([
    (0, common_1.Get)(':id/base64'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MascotasController.prototype, "getBase64", null);
exports.MascotasController = MascotasController = __decorate([
    (0, common_1.Controller)('mascotas'),
    __metadata("design:paramtypes", [mascotas_service_1.MascotasService])
], MascotasController);
//# sourceMappingURL=mascotas.controller.js.map