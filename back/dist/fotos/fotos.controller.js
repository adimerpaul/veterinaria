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
exports.FotosController = void 0;
const common_1 = require("@nestjs/common");
const fotos_service_1 = require("./fotos.service");
const update_foto_dto_1 = require("./dto/update-foto.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const sharp = require("sharp");
const fs = require("node:fs");
let FotosController = class FotosController {
    fotosService;
    constructor(fotosService) {
        this.fotosService = fotosService;
    }
    async create(body, file) {
        if (file) {
            const compressedFilename = `compressed-${file.filename}`;
            const compressedPath = `./uploads/${compressedFilename}`;
            await sharp(file.path)
                .resize(350)
                .jpeg({ quality: 70 })
                .toFile(compressedPath);
            fs.unlink(file.path, (err) => {
                if (err)
                    console.error('Error eliminando archivo original:', err);
            });
            body.imagen = `${compressedFilename}`;
        }
        return this.fotosService.create(body);
    }
    findAll() {
        return this.fotosService.findAll();
    }
    findOne(id) {
        return this.fotosService.findOne(+id);
    }
    update(id, updateFotoDto) {
        return this.fotosService.update(+id, updateFotoDto);
    }
    remove(id) {
        return this.fotosService.remove(+id);
    }
};
exports.FotosController = FotosController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imagen', {
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
], FotosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FotosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FotosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_foto_dto_1.UpdateFotoDto]),
    __metadata("design:returntype", void 0)
], FotosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FotosController.prototype, "remove", null);
exports.FotosController = FotosController = __decorate([
    (0, common_1.Controller)('fotos'),
    __metadata("design:paramtypes", [fotos_service_1.FotosService])
], FotosController);
//# sourceMappingURL=fotos.controller.js.map