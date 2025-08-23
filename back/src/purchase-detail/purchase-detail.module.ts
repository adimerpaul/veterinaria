import { Module } from '@nestjs/common';
import { PurchaseDetailService } from './purchase-detail.service';
import { PurchaseDetailController } from './purchase-detail.controller';

@Module({
  controllers: [PurchaseDetailController],
  providers: [PurchaseDetailService],
})
export class PurchaseDetailModule {}
