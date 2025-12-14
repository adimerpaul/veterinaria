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
exports.TratamientosService = void 0;
const common_1 = require("@nestjs/common");
const tratamiento_entity_1 = require("./entities/tratamiento.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tratamiento_medicamento_entity_1 = require("../tratamiento-medicamentos/entities/tratamiento-medicamento.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
let TratamientosService = class TratamientosService {
    tratamientosRepository;
    tratamientoMedicamentoRepository;
    productoRepository;
    constructor(tratamientosRepository, tratamientoMedicamentoRepository, productoRepository) {
        this.tratamientosRepository = tratamientosRepository;
        this.tratamientoMedicamentoRepository = tratamientoMedicamentoRepository;
        this.productoRepository = productoRepository;
    }
    async create(body, req) {
        body.user = { id: req.user.userId };
        body.fecha = new Date();
        body.historiale = { id: body.historialId };
        if (body.costo === '') {
            body.costo = 0;
        }
        const medicamentosData = body.medicamentos;
        if (medicamentosData != undefined) {
            const tratamientoMedicamentos = medicamentosData.map((med) => {
                const total = parseFloat(med.precio) * parseFloat(med.cantidad);
                const tratamientoMedicamento = new tratamiento_medicamento_entity_1.TratamientoMedicamento();
                tratamientoMedicamento.medicamento = med.nombre;
                tratamientoMedicamento.producto = { id: med.id };
                tratamientoMedicamento.precio = parseFloat(med.precio);
                tratamientoMedicamento.cantidad = parseFloat(med.cantidad);
                tratamientoMedicamento.total = total;
                tratamientoMedicamento.fecha = new Date();
                return tratamientoMedicamento;
            });
            body.tratamientoMedicamentos = tratamientoMedicamentos;
        }
        const tratamiento = this.tratamientosRepository.create(body);
        return await this.tratamientosRepository.save(tratamiento);
    }
    async updatePagado(id, updateTratamientoDto) {
        const tratamiento = await this.tratamientosRepository.findOne({
            where: { id },
        });
        if (!tratamiento) {
            return 'No se encontró el tratamiento';
        }
        tratamiento.pagado = updateTratamientoDto.pagado;
        return await this.tratamientosRepository.save(tratamiento);
    }
    async update(id, updateTratamientoDto) {
        const tratamiento = await this.tratamientosRepository.findOne({
            where: { id },
        });
        if (!tratamiento) {
            return 'No se encontró el tratamiento';
        }
        tratamiento.observaciones = updateTratamientoDto.observaciones;
        tratamiento.comentario = updateTratamientoDto.comentario;
        tratamiento.fecha = new Date();
        tratamiento.costo = updateTratamientoDto.costo;
        if (updateTratamientoDto.medicamentos) {
            const medicamentosData = updateTratamientoDto.medicamentos;
            await this.tratamientoMedicamentoRepository.remove(tratamiento.tratamientoMedicamentos);
            const tratamientoMedicamentos = medicamentosData.map((med) => {
                console.log(med);
                const total = parseFloat(med.precio) * parseFloat(med.cantidad);
                const tratamientoMedicamento = new tratamiento_medicamento_entity_1.TratamientoMedicamento();
                tratamientoMedicamento.medicamento = med.nombre;
                tratamientoMedicamento.producto = { id: med.id };
                tratamientoMedicamento.precio = parseFloat(med.precio);
                tratamientoMedicamento.cantidad = parseFloat(med.cantidad);
                tratamientoMedicamento.total = total;
                tratamientoMedicamento.fecha = new Date();
                return tratamientoMedicamento;
            });
            tratamiento.tratamientoMedicamentos = tratamientoMedicamentos;
        }
        return await this.tratamientosRepository.save(tratamiento);
    }
    async findAllByFecha(fecha) {
        return await this.tratamientosRepository
            .createQueryBuilder('tratamiento')
            .leftJoinAndSelect('tratamiento.user', 'user')
            .leftJoinAndSelect('tratamiento.historiale', 'historiale')
            .leftJoinAndSelect('historiale.mascota', 'mascota')
            .leftJoinAndSelect('tratamiento.tratamientoMedicamentos', 'tratamientoMedicamentos')
            .leftJoinAndSelect('tratamientoMedicamentos.producto', 'producto')
            .where('DATE(tratamiento.fecha) = :fecha', { fecha })
            .andWhere('producto.id IS NOT NULL')
            .orderBy('tratamiento.fecha', 'DESC')
            .getMany();
    }
    async remove(id) {
        const tratamiento = await this.tratamientosRepository.findOne({
            where: { id },
        });
        if (!tratamiento) {
            return 'No se encontró el tratamiento';
        }
        await this.tratamientosRepository.softDelete(id);
        return 'Tratamiento eliminado';
    }
    async reporteTratamientosPorDoctor(fecha) {
        const tratamientos = await this.tratamientosRepository
            .createQueryBuilder('tratamiento')
            .leftJoin('tratamiento.user', 'user')
            .leftJoin('tratamiento.historiale', 'historiale')
            .leftJoin('historiale.mascota', 'mascota')
            .select([
            'user.name AS doctor',
            'tratamiento.id AS id',
            'historiale.id AS nroFicha',
            'tratamiento.costo AS costo',
            "COALESCE(tratamiento.comentario, 'Tratamiento') AS detalle",
        ])
            .addSelect('COUNT(*) as cantidad')
            .where('DATE(tratamiento.fecha) = :fecha', { fecha })
            .groupBy('user.name, tratamiento.id, historiale.id, tratamiento.costo, tratamiento.comentario')
            .orderBy('user.name')
            .getRawMany();
        const agrupado = {};
        for (const row of tratamientos) {
            if (!agrupado[row.doctor])
                agrupado[row.doctor] = [];
            agrupado[row.doctor].push(row);
        }
        return agrupado;
    }
};
exports.TratamientosService = TratamientosService;
exports.TratamientosService = TratamientosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tratamiento_entity_1.Tratamiento)),
    __param(1, (0, typeorm_1.InjectRepository)(tratamiento_medicamento_entity_1.TratamientoMedicamento)),
    __param(2, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TratamientosService);
//# sourceMappingURL=tratamientos.service.js.map