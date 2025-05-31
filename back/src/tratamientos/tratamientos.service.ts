import { Injectable } from '@nestjs/common';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { Tratamiento } from './entities/tratamiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TratamientoMedicamento } from '../tratamiento-medicamentos/entities/tratamiento-medicamento.entity';

@Injectable()
export class TratamientosService {
  constructor(
    @InjectRepository(Tratamiento)
    private tratamientosRepository: Repository<Tratamiento>,
    @InjectRepository(TratamientoMedicamento)
    private tratamientoMedicamentoRepository: Repository<TratamientoMedicamento>,
  ) {}
  async create(body, req) {
    body.user = { id: req.user.userId };
    body.fecha = new Date();
    body.historiale = { id: body.historialId };

    if (body.costo === '') {
      body.costo = 0;
    }

    const medicamentosData = body.medicamentos;

    // Construir los TratamientoMedicamento
    const tratamientoMedicamentos = medicamentosData.map((med) => {
      const total = parseFloat(med.precio) * parseFloat(med.cantidad);
      const tratamientoMedicamento = new TratamientoMedicamento();
      tratamientoMedicamento.medicamento = med.nombre;
      tratamientoMedicamento.precio = parseFloat(med.precio);
      tratamientoMedicamento.cantidad = parseFloat(med.cantidad);
      tratamientoMedicamento.total = total;
      tratamientoMedicamento.fecha = new Date(); // o puedes usar body.fecha si quieres una sola fecha
      return tratamientoMedicamento;
    });

    // Asignar al cuerpo
    body.tratamientoMedicamentos = tratamientoMedicamentos;

    // Crear y guardar el tratamiento con los medicamentos relacionados
    const tratamiento = this.tratamientosRepository.create(body);
    return await this.tratamientosRepository.save(tratamiento);
  }

  async findAllByFecha(fecha: string) {
    return await this.tratamientosRepository
      .createQueryBuilder('tratamiento')
      .leftJoinAndSelect('tratamiento.user', 'user')
      .leftJoinAndSelect('tratamiento.historiale', 'historiale')
      .leftJoinAndSelect('historiale.mascota', 'mascota')
      .leftJoinAndSelect('tratamiento.tratamientoMedicamentos', 'tratamientoMedicamentos')
      .where('DATE(tratamiento.fecha) = :fecha', { fecha })
      .orderBy('tratamiento.fecha', 'DESC')
      .getMany();
  }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} tratamiento`;
  // }
  //
  // update(id: number, updateTratamientoDto: UpdateTratamientoDto) {
  //   return `This action updates a #${id} tratamiento`;
  // }

  async remove(id: number) {
    const tratamiento = await this.tratamientosRepository.findOne({
      where: { id },
    });
    if (!tratamiento) {
      return 'No se encontró el tratamiento';
    }
    await this.tratamientosRepository.softDelete(id);
    return 'Tratamiento eliminado';
  }
}
