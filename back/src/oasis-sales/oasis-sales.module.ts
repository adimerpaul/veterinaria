import { Module } from '@nestjs/common';
import { OasisSalesService } from './oasis-sales.service';
import { OasisSalesController } from './oasis-sales.controller';

@Module({
  controllers: [OasisSalesController],
  providers: [OasisSalesService],
})
export class OasisSalesModule {}
