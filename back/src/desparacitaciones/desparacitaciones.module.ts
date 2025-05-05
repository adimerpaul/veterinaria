import { Module } from '@nestjs/common';
import { DesparacitacionesService } from './desparacitaciones.service';
import { DesparacitacionesController } from './desparacitaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desparacitacione } from './entities/desparacitacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Desparacitacione])], // Aquí debes agregar el modelo de Desparacitacione
  controllers: [DesparacitacionesController],
  providers: [DesparacitacionesService],
})
export class DesparacitacionesModule {}
