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

  async findAll() {
    // return this.productosRepository.find() order by nombre
    return this.productosRepository.find({
      order: {
        nombre: 'ASC',
      },
    });
  }

  async update(id: number, body) {
    await this.productosRepository.update(id, body);
    return this.productosRepository;
  }

  async remove(id: number) {
    await this.productosRepository.delete(id);
    return {
      id,
    };
  }
}
