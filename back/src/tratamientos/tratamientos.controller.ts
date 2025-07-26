import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards, Query, Put,
} from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tratamientos')
export class TratamientosController {
  constructor(private readonly tratamientosService: TratamientosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body, @Req() req: Request) {
    // req.user.id
    return this.tratamientosService.create(body, req);
  }

  @Get()
  findAll(@Query('fecha') fecha: string) {
    // console.log(fecha)
    return this.tratamientosService.findAllByFecha(fecha);
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tratamientosService.findOne(+id);
  // }
  //
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTratamientoDto: UpdateTratamientoDto,
  ) {
    return this.tratamientosService.update(+id, updateTratamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tratamientosService.remove(+id);
  }
}
