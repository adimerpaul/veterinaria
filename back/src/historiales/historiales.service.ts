import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historiale } from './entities/historiale.entity';

@Injectable()
export class HistorialesService {
  constructor(
    @InjectRepository(Historiale)
    private readonly historialRepo: Repository<Historiale>,
  ) {}

  async create(data) {
    data.mascota = { id: data.mascotaId };
    const nuevo = this.historialRepo.create(data);
    return this.historialRepo.save(nuevo);
  }

  async update(id: number, data) {
    const historial = await this.historialRepo.findOne({ where: { id } });
    if (!historial) throw new Error('Historial no encontrado');
    Object.assign(historial, data);
    return this.historialRepo.save(historial);
  }

  async remove(id: number) {
    return this.historialRepo.softDelete(id);
  }
}
