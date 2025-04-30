import { Module } from '@nestjs/common';
import { DesparacitacionesService } from './desparacitaciones.service';
import { DesparacitacionesController } from './desparacitaciones.controller';

@Module({
  controllers: [DesparacitacionesController],
  providers: [DesparacitacionesService],
})
export class DesparacitacionesModule {}
