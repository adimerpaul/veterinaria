import { Injectable } from '@nestjs/common';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacuna } from './entities/vacuna.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class VacunasService {
  constructor(
    @InjectRepository(Vacuna)
    private readonly vacunaRepository: Repository<Vacuna>,
  ) {}
  async create(body, req) {
    // console.log(req.user);

    body.fechaVacuna = moment().format('YYYY-MM-DD');
    body.mascota = { id: body.mascotaId };
    body.user = { id: req.user.userId };
    // console.log('body', body);
    const vacuna = this.vacunaRepository.create(body);
    return await this.vacunaRepository.save(vacuna);
  }

  // findAll() {
  //   return `This action returns all vacunas`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} vacuna`;
  // }

  // update(id: number, updateVacunaDto: UpdateVacunaDto) {
  //   return `This action updates a #${id} vacuna`;
  // }

  async remove(id: number) {
    const vacuna = await this.vacunaRepository.findOne({ where: { id } });
    if (!vacuna) {
      throw new Error('Vacuna not found');
    }
    // console.log('vacuna', vacuna);
    return await this.vacunaRepository.softDelete(id);
  }
  async findProximasVacunas(dias: number = 7) {
    const hoy = moment().startOf('day');
    const limite = moment().add(dias, 'days').endOf('day');

    return await this.vacunaRepository
        .createQueryBuilder('vacuna')
        .leftJoinAndSelect('vacuna.mascota', 'mascota')
        .leftJoinAndSelect('vacuna.user', 'user')
        .where('vacuna.fechaProximaVacuna BETWEEN :hoy AND :limite', {
          hoy: hoy.format('YYYY-MM-DD'),
          limite: limite.format('YYYY-MM-DD'),
        })
        .orderBy('vacuna.fechaProximaVacuna', 'ASC')
        .getMany();

  }
}
