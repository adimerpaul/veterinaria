import { Module } from '@nestjs/common';
import { OasisProductosService } from './oasis-productos.service';
import { OasisProductosController } from './oasis-productos.controller';
import { OasisProducto } from './entities/oasis-producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([OasisProducto])],
  controllers: [OasisProductosController],
  providers: [OasisProductosService],
})
export class OasisProductosModule {}
