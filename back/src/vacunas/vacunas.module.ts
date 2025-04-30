import { Module } from '@nestjs/common';
import { VacunasService } from './vacunas.service';
import { VacunasController } from './vacunas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacuna } from './entities/vacuna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacuna])], // Aquí debes agregar el modelo de Vacuna
  controllers: [VacunasController],
  providers: [VacunasService],
})
export class VacunasModule {}
