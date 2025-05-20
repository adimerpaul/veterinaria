import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TratamientoMedicamentosService } from './tratamiento-medicamentos.service';
import { CreateTratamientoMedicamentoDto } from './dto/create-tratamiento-medicamento.dto';
import { UpdateTratamientoMedicamentoDto } from './dto/update-tratamiento-medicamento.dto';

@Controller('tratamiento-medicamentos')
export class TratamientoMedicamentosController {
  constructor(private readonly tratamientoMedicamentosService: TratamientoMedicamentosService) {}

  @Post()
  create(@Body() createTratamientoMedicamentoDto: CreateTratamientoMedicamentoDto) {
    return this.tratamientoMedicamentosService.create(createTratamientoMedicamentoDto);
  }

  @Get()
  findAll() {
    return this.tratamientoMedicamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tratamientoMedicamentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTratamientoMedicamentoDto: UpdateTratamientoMedicamentoDto) {
    return this.tratamientoMedicamentosService.update(+id, updateTratamientoMedicamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tratamientoMedicamentosService.remove(+id);
  }
}
