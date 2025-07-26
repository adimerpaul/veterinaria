import { Module } from '@nestjs/common';
import { LaboratoriosService } from './laboratorios.service';
import { LaboratoriosController } from './laboratorios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratorio } from './entities/laboratorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Laboratorio])],
  controllers: [LaboratoriosController],
  providers: [LaboratoriosService],
})
export class LaboratoriosModule {}
