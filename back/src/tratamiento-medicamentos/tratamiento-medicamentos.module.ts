import { Module } from '@nestjs/common';
import { TratamientoMedicamentosService } from './tratamiento-medicamentos.service';
import { TratamientoMedicamentosController } from './tratamiento-medicamentos.controller';

@Module({
  controllers: [TratamientoMedicamentosController],
  providers: [TratamientoMedicamentosService],
})
export class TratamientoMedicamentosModule {}
