import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';
import { User } from '../users/entities/user.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Sale } from '../sales/entities/sale.entity';
import { Historiale } from '../historiales/entities/historiale.entity';
// import { PurchaseDetail } from '../purchase-details/entities/purchase-detail.entity';
import { Detail } from '../details/entities/detail.entity';
import { PurchaseDetail } from '../purchase-detail/entities/purchase-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Producto,
      Sale,
      Historiale,
      PurchaseDetail,
      Detail,
    ]),
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
