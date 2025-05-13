import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialesService } from './historiales.service';
import { CreateHistorialeDto } from './dto/create-historiale.dto';
import { UpdateHistorialeDto } from './dto/update-historiale.dto';

@Controller('historiales')
export class HistorialesController {
  constructor(private readonly historialesService: HistorialesService) {}

  @Post()
  create(@Body() createHistorialeDto: CreateHistorialeDto) {
    return this.historialesService.create(createHistorialeDto);
  }

  @Get()
  findAll() {
    return this.historialesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialeDto: UpdateHistorialeDto) {
    return this.historialesService.update(+id, updateHistorialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialesService.remove(+id);
  }
}
