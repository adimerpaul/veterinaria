import { Injectable } from '@nestjs/common';
import { CreateOasisProductoDto } from './dto/create-oasis-producto.dto';
import { UpdateOasisProductoDto } from './dto/update-oasis-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OasisProducto } from './entities/oasis-producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OasisProductosService {
  constructor(
    @InjectRepository(OasisProducto)
    private oasisProductoRepository: Repository<OasisProducto>,
  ) {}

  async create(data: CreateOasisProductoDto) {
    const producto = this.oasisProductoRepository.create(data);
    return await this.oasisProductoRepository.save(producto);
  }

  async findAll(params: { filter?: string; tipo?: string; page?: number; limit?: number }) {
    const { filter = '', tipo = '', page = 1, limit = 20 } = params;

    const query = this.oasisProductoRepository.createQueryBuilder('producto')
      .where('producto.nombre LIKE :filter', { filter: `%${filter}%` });

    if (tipo) query.andWhere('producto.tipo = :tipo', { tipo });

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      last_page: Math.ceil(total / limit),
    };
  }

  async update(id: number, data: UpdateOasisProductoDto) {
    await this.oasisProductoRepository.update(id, data);
    return await this.oasisProductoRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.oasisProductoRepository.softDelete(id);
  }

  async findOne(id: number) {
    return await this.oasisProductoRepository.findOne({ where: { id } });
  }
}

