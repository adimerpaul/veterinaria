import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DesparacitacionesService } from './desparacitaciones.service';
import { CreateDesparacitacioneDto } from './dto/create-desparacitacione.dto';
import { UpdateDesparacitacioneDto } from './dto/update-desparacitacione.dto';

@Controller('desparacitaciones')
export class DesparacitacionesController {
  constructor(private readonly desparacitacionesService: DesparacitacionesService) {}

  @Post()
  create(@Body() createDesparacitacioneDto: CreateDesparacitacioneDto) {
    return this.desparacitacionesService.create(createDesparacitacioneDto);
  }

  @Get()
  findAll() {
    return this.desparacitacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desparacitacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesparacitacioneDto: UpdateDesparacitacioneDto) {
    return this.desparacitacionesService.update(+id, updateDesparacitacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desparacitacionesService.remove(+id);
  }
}
