import { Injectable } from '@nestjs/common';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { Foto } from './entities/foto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FotosService {
  constructor(
    @InjectRepository(Foto)
    private readonly fotoRepository: Repository<Foto>
  ) {}
  async create(body) {
    console.log('Creating foto with body:', body);
    const { imagen, fecha, observaciones, mascotaId, userId } = body;

    const foto = this.fotoRepository.create({
      imagen,
      fecha,
      observaciones,
      mascota: { id: mascotaId },
      user: { id: userId },
    });

    return this.fotoRepository.save(foto);
  }

  findAll() {
    return `This action returns all fotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foto`;
  }

  update(id: number, updateFotoDto: UpdateFotoDto) {
    return `This action updates a #${id} foto`;
  }

  async remove(id: number) {
    const foto = await this.fotoRepository.findOne({ where: { id } });
    if (!foto) {
      throw new Error(`Foto with id ${id} not found`);
    }
    return this.fotoRepository.remove(foto);
  }
}
