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
      query.where('mascota.nombre LIKE :filter', { filter: `%${filter}%` });
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

  findOne(id: number) {
    return `This action returns a #${id} mascota`;
  }

  update(id: number, updateMascotaDto: UpdateMascotaDto) {
    return `This action updates a #${id} mascota`;
  }

  remove(id: number) {
    return `This action removes a #${id} mascota`;
  }
}
