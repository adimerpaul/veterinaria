import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { TratamientoMedicamento } from '../tratamiento-medicamentos/entities/tratamiento-medicamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, TratamientoMedicamento])],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
