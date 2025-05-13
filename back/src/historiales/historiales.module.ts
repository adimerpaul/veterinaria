import { Module } from '@nestjs/common';
import { HistorialesService } from './historiales.service';
import { HistorialesController } from './historiales.controller';

@Module({
  controllers: [HistorialesController],
  providers: [HistorialesService],
})
export class HistorialesModule {}
