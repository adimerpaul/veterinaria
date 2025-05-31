import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query, Put,
} from '@nestjs/common';
import { OasisProductosService } from './oasis-productos.service';
import { CreateOasisProductoDto } from './dto/create-oasis-producto.dto';
import { UpdateOasisProductoDto } from './dto/update-oasis-producto.dto';

@Controller('oasis-productos')
export class OasisProductosController {
  constructor(private readonly service: OasisProductosService) {}

  @Post()
  create(@Body() body: CreateOasisProductoDto) {
    return this.service.create(body);
  }

  @Get()
  findAll(@Query() query) {
    return this.service.findAll(query);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateOasisProductoDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }
}
