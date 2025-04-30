import { Injectable } from '@nestjs/common';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacuna } from './entities/vacuna.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VacunasService {
  constructor(
    @InjectRepository(Vacuna)
    private readonly vacunaRepository: Repository<Vacuna>,
  ) {}
  async create(body) {
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
    return await this.vacunaRepository.remove(vacuna);
  }
}
