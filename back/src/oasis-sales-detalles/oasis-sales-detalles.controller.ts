import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OasisSalesDetallesService } from './oasis-sales-detalles.service';
import { CreateOasisSalesDetalleDto } from './dto/create-oasis-sales-detalle.dto';
import { UpdateOasisSalesDetalleDto } from './dto/update-oasis-sales-detalle.dto';

@Controller('oasis-sales-detalles')
export class OasisSalesDetallesController {
  constructor(private readonly oasisSalesDetallesService: OasisSalesDetallesService) {}

  @Post()
  create(@Body() createOasisSalesDetalleDto: CreateOasisSalesDetalleDto) {
    return this.oasisSalesDetallesService.create(createOasisSalesDetalleDto);
  }

  @Get()
  findAll() {
    return this.oasisSalesDetallesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oasisSalesDetallesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOasisSalesDetalleDto: UpdateOasisSalesDetalleDto) {
    return this.oasisSalesDetallesService.update(+id, updateOasisSalesDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oasisSalesDetallesService.remove(+id);
  }
}
