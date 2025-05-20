import { Injectable } from '@nestjs/common';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { Tratamiento } from './entities/tratamiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TratamientosService {
  constructor(
    @InjectRepository(Tratamiento)
    private tratamientosRepository: Repository<Tratamiento>,
  ) {}
  async create(body, req) {
    body.user = { id: req.user.userId };
    body.fecha = new Date();
    body.historiale = { id: body.historialId };
    if (body.costo === '') {
      body.costo = 0;
    }
    console.log(body);
    const tratamiento = this.tratamientosRepository.create(body);
    return await this.tratamientosRepository.save(tratamiento);
  }

  findAll() {
    return `This action returns all tratamientos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tratamiento`;
  }

  update(id: number, updateTratamientoDto: UpdateTratamientoDto) {
    return `This action updates a #${id} tratamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tratamiento`;
  }
}
