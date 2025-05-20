import { Injectable } from '@nestjs/common';
import { CreateTratamientoMedicamentoDto } from './dto/create-tratamiento-medicamento.dto';
import { UpdateTratamientoMedicamentoDto } from './dto/update-tratamiento-medicamento.dto';

@Injectable()
export class TratamientoMedicamentosService {
  create(createTratamientoMedicamentoDto: CreateTratamientoMedicamentoDto) {
    return 'This action adds a new tratamientoMedicamento';
  }

  findAll() {
    return `This action returns all tratamientoMedicamentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tratamientoMedicamento`;
  }

  update(id: number, updateTratamientoMedicamentoDto: UpdateTratamientoMedicamentoDto) {
    return `This action updates a #${id} tratamientoMedicamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tratamientoMedicamento`;
  }
}
