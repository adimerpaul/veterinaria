import { Module } from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { TratamientosController } from './tratamientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tratamiento } from './entities/tratamiento.entity';
import { TratamientoMedicamento } from '../tratamiento-medicamentos/entities/tratamiento-medicamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tratamiento, TratamientoMedicamento])],
  controllers: [TratamientosController],
  providers: [TratamientosService],
})
export class TratamientosModule {}
