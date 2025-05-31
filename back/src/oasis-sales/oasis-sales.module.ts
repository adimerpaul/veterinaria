import { Module } from '@nestjs/common';
import { OasisSalesService } from './oasis-sales.service';
import { OasisSalesController } from './oasis-sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OasisSale } from './entities/oasis-sale.entity';
import { OasisSalesDetalle } from '../oasis-sales-detalles/entities/oasis-sales-detalle.entity';
import { OasisProducto } from '../oasis-productos/entities/oasis-producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OasisSale,OasisSalesDetalle])],
  controllers: [OasisSalesController],
  providers: [OasisSalesService],
})
export class OasisSalesModule {}
