import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { VacunasService } from './vacunas.service';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('vacunas')
export class VacunasController {
  constructor(private readonly vacunasService: VacunasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body, @Req() req: Request) {
    // console.log(req.user.id);
    return this.vacunasService.create(body, req);
  }

  // @Get()
  // findAll() {
  //   return this.vacunasService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.vacunasService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVacunaDto: UpdateVacunaDto) {
  //   return this.vacunasService.update(+id, updateVacunaDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacunasService.remove(+id);
  }
}
