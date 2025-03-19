import { Module } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from './entities/mascota.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Detail } from '../details/entities/detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mascota, Producto, Detail])],
  controllers: [MascotasController],
  providers: [MascotasService],
})
export class MascotasModule {}
