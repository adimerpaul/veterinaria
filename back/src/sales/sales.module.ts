import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Detail } from '../details/entities/detail.entity';
import { Mascota } from '../mascotas/entities/mascota.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Producto, Detail, Mascota, User])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
