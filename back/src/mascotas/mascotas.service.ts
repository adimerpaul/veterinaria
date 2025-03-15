import { Injectable, Query } from '@nestjs/common';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { Mascota } from './entities/mascota.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private mascotasRepository: Repository<Mascota>,
  ) {}
  async create(body) {
    // console.log(body);
    const mascota = this.mascotasRepository.create(body);
    return await this.mascotasRepository.save(mascota);
  }
  async findAll(page: number = 1, limit: number = 10, filter: string = '') {
    const query = this.mascotasRepository.createQueryBuilder('mascota');
    if (filter) {
      query.where(
        'mascota.nombre LIKE :filter OR mascota.propietario_nombre LIKE :filter',
        { filter: `%${filter}%` },
      );
    }
    query
      .orderBy('mascota.nombre', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);
    const [mascotas, total] = await query.getManyAndCount();
    return {
      data: mascotas,
      total,
      last_page: Math.ceil(total / limit),
      current_page: page,
    };
  }

  async findOne(id: number) {
    return await this.mascotasRepository.findOne({ where: { id } });
  }

  async update(id: number, body) {
    // console.log(body);
    await this.mascotasRepository.update(id, body);
    const mascota = await this.mascotasRepository.findOne({ where: { id } });
    console.log(mascota);
    return mascota;
  }

  async remove(id: number) {
    return await this.mascotasRepository.delete(id);
  }
}
