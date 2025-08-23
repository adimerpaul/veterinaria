import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PurchasesController } from './purchases.controller';
// import { PurchasesService } from './purchases.service';
import { Purchase } from './entities/purchase.entity';
// import { PurchaseDetail } from '../purchase-details/entities/purchase-detail.entity';
import { User } from '../users/entities/user.entity';
import { Producto } from '../productos/entities/producto.entity';
import { PurchasesController } from './purchase.controller';
import { PurchasesService } from './purchase.service';
import { PurchaseDetail } from '../purchase-detail/entities/purchase-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, PurchaseDetail, User, Producto]),
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
