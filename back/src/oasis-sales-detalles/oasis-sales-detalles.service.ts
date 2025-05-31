import { Injectable } from '@nestjs/common';
import { CreateOasisSalesDetalleDto } from './dto/create-oasis-sales-detalle.dto';
import { UpdateOasisSalesDetalleDto } from './dto/update-oasis-sales-detalle.dto';

@Injectable()
export class OasisSalesDetallesService {
  create(createOasisSalesDetalleDto: CreateOasisSalesDetalleDto) {
    return 'This action adds a new oasisSalesDetalle';
  }

  findAll() {
    return `This action returns all oasisSalesDetalles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oasisSalesDetalle`;
  }

  update(id: number, updateOasisSalesDetalleDto: UpdateOasisSalesDetalleDto) {
    return `This action updates a #${id} oasisSalesDetalle`;
  }

  remove(id: number) {
    return `This action removes a #${id} oasisSalesDetalle`;
  }
}
