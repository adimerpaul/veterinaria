import { Module } from '@nestjs/common';
import { OasisSalesDetallesService } from './oasis-sales-detalles.service';
import { OasisSalesDetallesController } from './oasis-sales-detalles.controller';

@Module({
  controllers: [OasisSalesDetallesController],
  providers: [OasisSalesDetallesService],
})
export class OasisSalesDetallesModule {}
