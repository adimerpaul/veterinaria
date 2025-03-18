import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}
  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  async findAll(fechaInicio: string, fechaFin: string) {
    console.log(fechaInicio, fechaFin);

    const sales = await this.salesRepository.find({
      where: {
        fecha: Between(new Date(fechaInicio), new Date(fechaFin)), // Convertir a Date
      },
      relations: ['user', 'mascota', 'details'],
    });

    return sales;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
