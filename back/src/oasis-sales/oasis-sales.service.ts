import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OasisSale } from './entities/oasis-sale.entity';
import { OasisSalesDetalle } from '../oasis-sales-detalles/entities/oasis-sales-detalle.entity';
import { CreateOasisSaleDto } from './dto/create-oasis-sale.dto';

@Injectable()
export class OasisSalesService {
  constructor(
    @InjectRepository(OasisSale)
    private oasisSaleRepo: Repository<OasisSale>,

    @InjectRepository(OasisSalesDetalle)
    private oasisDetalleRepo: Repository<OasisSalesDetalle>,
  ) {}

  async create(createOasisSaleDto) {
    const { productos, total, comentario, nombre, ci } =
      createOasisSaleDto;

    const venta = this.oasisSaleRepo.create({
      total,
      comentario,
      nombre,
      ci,
      user: { id: createOasisSaleDto.userId },
      fecha: new Date(),
      anulado: false,
    });

    const savedVenta = await this.oasisSaleRepo.save(venta);

    const detalles = productos.map((p) => {
      const detalle = new OasisSalesDetalle();
      detalle.productoName = p.nombre;
      detalle.precio = p.precioVenta;
      detalle.cantidad = p.cantidadVenta;
      detalle.subtotal = p.precioVenta * p.cantidadVenta;
      detalle.fecha = new Date();
      detalle.oasisSale = savedVenta;
      return detalle;
    });

    await this.oasisDetalleRepo.save(detalles);

    return { sale: savedVenta, detalles };
  }

  async findAll() {
    return this.oasisSaleRepo.find({
      relations: ['user', 'oasisSalesDetalles'],
      order: { fecha: 'DESC' },
    });
  }

  async findOne(id: number) {
    return this.oasisSaleRepo.findOne({
      where: { id },
      relations: ['user', 'oasisSalesDetalles'],
    });
  }

  async remove(id: number) {
    const venta = await this.oasisSaleRepo.findOne({ where: { id } });
    if (!venta) throw new Error('No se encontró la venta');
    await this.oasisSaleRepo.softDelete(id);
    return 'Venta eliminada';
  }
  // anular
  async anular(id: number, userId: number) {
    const venta = await this.oasisSaleRepo.findOne({ where: { id } });
    if (!venta) throw new Error('No se encontró la venta');

    if (venta.anulado) {
      throw new Error('La venta ya está anulada');
    }

    venta.anulado = true;
    // venta.userAnulacion = { id: userId };
    await this.oasisSaleRepo.save(venta);

    return 'Venta anulada correctamente';
  }
}
