import { Module } from '@nestjs/common';
import { HistorialesService } from './historiales.service';
import { HistorialesController } from './historiales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historiale } from './entities/historiale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Historiale])],
  controllers: [HistorialesController],
  providers: [HistorialesService],
})
export class HistorialesModule {}
