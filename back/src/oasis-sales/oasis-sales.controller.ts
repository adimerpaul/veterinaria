import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OasisSalesService } from './oasis-sales.service';
import { CreateOasisSaleDto } from './dto/create-oasis-sale.dto';
import { UpdateOasisSaleDto } from './dto/update-oasis-sale.dto';

@Controller('oasis-sales')
export class OasisSalesController {
  constructor(private readonly oasisSalesService: OasisSalesService) {}

  @Post()
  create(@Body() createOasisSaleDto: CreateOasisSaleDto) {
    return this.oasisSalesService.create(createOasisSaleDto);
  }

  @Get()
  findAll() {
    return this.oasisSalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oasisSalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOasisSaleDto: UpdateOasisSaleDto) {
    return this.oasisSalesService.update(+id, updateOasisSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oasisSalesService.remove(+id);
  }
}
