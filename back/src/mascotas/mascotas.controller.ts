import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  create(@Body() createMascotaDto: CreateMascotaDto) {
    return this.mascotasService.create(createMascotaDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '',
  ) {
    return this.mascotasService.findAll(Number(page), Number(limit), filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mascotasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMascotaDto: UpdateMascotaDto) {
    return this.mascotasService.update(+id, updateMascotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mascotasService.remove(+id);
  }
}
