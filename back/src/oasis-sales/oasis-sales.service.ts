import { Injectable } from '@nestjs/common';
import { CreateOasisSaleDto } from './dto/create-oasis-sale.dto';
import { UpdateOasisSaleDto } from './dto/update-oasis-sale.dto';

@Injectable()
export class OasisSalesService {
  create(createOasisSaleDto: CreateOasisSaleDto) {
    return 'This action adds a new oasisSale';
  }

  findAll() {
    return `This action returns all oasisSales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oasisSale`;
  }

  update(id: number, updateOasisSaleDto: UpdateOasisSaleDto) {
    return `This action updates a #${id} oasisSale`;
  }

  remove(id: number) {
    return `This action removes a #${id} oasisSale`;
  }
}
