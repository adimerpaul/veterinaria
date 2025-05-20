import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}
  async create(body) {
    const producto = this.productosRepository.create(body);
    await this.productosRepository.save(producto);
    return producto;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: string = '',
    tipo: string = '',
  ) {
    const query = this.productosRepository.createQueryBuilder('producto');

    if (filter) {
      query.where('producto.nombre LIKE :filter', { filter: `%${filter}%` });
    }
    if (tipo) {
      query.andWhere('producto.tipo = :tipo', { tipo });
    }

    query
      .orderBy('producto.nombre', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [productos, total] = await query.getManyAndCount();

    return {
      data: productos,
      total,
      last_page: Math.ceil(total / limit),
      current_page: page,
    };
  }

  async update(id: number, body) {
    await this.productosRepository.update(id, body);
    return await this.productosRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.productosRepository.delete(id);
    return {
      id,
    };
  }
  async findAllProductos() {
    return await this.productosRepository.find();
  }
}
