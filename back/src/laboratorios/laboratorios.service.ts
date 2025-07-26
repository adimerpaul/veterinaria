import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratorio } from './entities/laboratorio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LaboratoriosService {
  constructor(
    @InjectRepository(Laboratorio)
    private labRepo: Repository<Laboratorio>,
  ) {}

  async create(data) {
    data.fecha = new Date(data.fecha);
    data.user = { id: data.userId };
    data.mascota = { id: data.mascotaId };
    const lab = this.labRepo.create(data);
    return await this.labRepo.save(lab);
  }

  async findAll() {
    return await this.labRepo.find({
      relations: ['user', 'mascota'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    return await this.labRepo.findOne({ where: { id }, relations: ['user', 'mascota'] });
  }

  async remove(id: number) {
    return await this.labRepo.softDelete(id);
  }
}
