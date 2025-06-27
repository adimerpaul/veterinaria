import { Module } from '@nestjs/common';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Sale } from '../sales/entities/sale.entity';
import { Historiale } from '../historiales/entities/historiale.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      User,
      Producto,
      Sale,
      Historiale
    ]),
  ],
  controllers: [ReportesController],
  providers: [ReportesService]
})
export class ReportesModule {}
