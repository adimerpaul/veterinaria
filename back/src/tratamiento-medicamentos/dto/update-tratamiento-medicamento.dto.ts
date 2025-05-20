import { PartialType } from '@nestjs/mapped-types';
import { CreateTratamientoMedicamentoDto } from './create-tratamiento-medicamento.dto';

export class UpdateTratamientoMedicamentoDto extends PartialType(CreateTratamientoMedicamentoDto) {}
