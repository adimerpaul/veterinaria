import { Injectable } from '@nestjs/common';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { Tratamiento } from './entities/tratamiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TratamientoMedicamento } from '../tratamiento-medicamentos/entities/tratamiento-medicamento.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class TratamientosService {
  constructor(
    @InjectRepository(Tratamiento)
    private tratamientosRepository: Repository<Tratamiento>,
    @InjectRepository(TratamientoMedicamento)
    private tratamientoMedicamentoRepository: Repository<TratamientoMedicamento>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
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
    // console.log('Medicamentos Data:', medicamentosData);
    if (medicamentosData != undefined) {
      const tratamientoMedicamentos = medicamentosData.map((med) => {
        const total = parseFloat(med.precio) * parseFloat(med.cantidad);
        const tratamientoMedicamento = new TratamientoMedicamento();
        // producto find
        tratamientoMedicamento.medicamento = med.nombre;
        tratamientoMedicamento.producto = { id: med.id } as Producto;
        tratamientoMedicamento.precio = parseFloat(med.precio);
        tratamientoMedicamento.cantidad = parseFloat(med.cantidad);
        tratamientoMedicamento.total = total;
        tratamientoMedicamento.fecha = new Date(); // o puedes usar body.fecha si quieres una sola fecha
        return tratamientoMedicamento;
      });
      body.tratamientoMedicamentos = tratamientoMedicamentos;
    }

    // Asignar al cuerpo

    // Crear y guardar el tratamiento con los medicamentos relacionados
    const tratamiento = this.tratamientosRepository.create(body);
    return await this.tratamientosRepository.save(tratamiento);
  }
  async updatePagado(id: number, updateTratamientoDto) {
    const tratamiento = await this.tratamientosRepository.findOne({
      where: { id },
    });

    if (!tratamiento) {
      return 'No se encontró el tratamiento';
    }

    // Actualizar el campo pagado
    tratamiento.pagado = updateTratamientoDto.pagado;

    return await this.tratamientosRepository.save(tratamiento);
  }
  async update(id: number, updateTratamientoDto) {
    const tratamiento = await this.tratamientosRepository.findOne({
      where: { id },
      // relations: ['tratamientoMedicamentos'],
    });

    if (!tratamiento) {
      return 'No se encontró el tratamiento';
    }

    // Actualizar los campos del tratamiento
    tratamiento.observaciones = updateTratamientoDto.observaciones;
    tratamiento.comentario = updateTratamientoDto.comentario;
    tratamiento.fecha = new Date();
    tratamiento.costo = updateTratamientoDto.costo;

    // Actualizar los medicamentos si se proporcionan
    if (updateTratamientoDto.medicamentos) {
      const medicamentosData = updateTratamientoDto.medicamentos;
      // console.log('Medicamentos Data:', medicamentosData);

      // Eliminar los medicamentos existentes
      await this.tratamientoMedicamentoRepository.remove(
        tratamiento.tratamientoMedicamentos,
      );
      const tratamientoMedicamentos = medicamentosData.map((med) => {
        console.log(med);
        const total = parseFloat(med.precio) * parseFloat(med.cantidad);
        const tratamientoMedicamento = new TratamientoMedicamento();
        tratamientoMedicamento.medicamento = med.nombre;
        tratamientoMedicamento.producto = { id: med.id } as Producto;
        tratamientoMedicamento.precio = parseFloat(med.precio);
        tratamientoMedicamento.cantidad = parseFloat(med.cantidad);
        tratamientoMedicamento.total = total;
        tratamientoMedicamento.fecha = new Date(); // o puedes usar body.fecha si quieres una sola fecha
        return tratamientoMedicamento;
      });
      tratamiento.tratamientoMedicamentos = tratamientoMedicamentos;
    }

    return await this.tratamientosRepository.save(tratamiento);
  }

  async findAllByFecha(fecha: string) {
    return await this.tratamientosRepository
      .createQueryBuilder('tratamiento')
      .leftJoinAndSelect('tratamiento.user', 'user')
      .leftJoinAndSelect('tratamiento.historiale', 'historiale')
      .leftJoinAndSelect('historiale.mascota', 'mascota')
      .leftJoinAndSelect('tratamiento.tratamientoMedicamentos', 'tratamientoMedicamentos')
      .leftJoinAndSelect('tratamientoMedicamentos.producto', 'producto')
      .where('DATE(tratamiento.fecha) = :fecha', { fecha })
      .andWhere('producto.id IS NOT NULL') // ✅ solo si hay producto asociado
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
