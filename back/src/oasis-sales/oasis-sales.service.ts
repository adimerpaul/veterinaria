import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OasisSale } from './entities/oasis-sale.entity';
import { OasisSalesDetalle } from '../oasis-sales-detalles/entities/oasis-sales-detalle.entity';
import { CreateOasisSaleDto } from './dto/create-oasis-sale.dto';
import { OasisProducto } from '../oasis-productos/entities/oasis-producto.entity';

@Injectable()
export class OasisSalesService {
  constructor(
    @InjectRepository(OasisSale)
    private oasisSaleRepo: Repository<OasisSale>,

    @InjectRepository(OasisSalesDetalle)
    private oasisDetalleRepo: Repository<OasisSalesDetalle>,

    @InjectRepository(OasisProducto)
    private oasisProductoRepo: Repository<OasisProducto>,
  ) {}

  async create(createOasisSaleDto) {
    const { productos, total, comentario, nombre, ci } = createOasisSaleDto;

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

    const detalles: OasisSalesDetalle[] = [];

    for (const p of productos) {
      const producto = await this.oasisProductoRepo.findOne({
        where: { id: p.id },
      });

      if (!producto) {
        throw new Error(`Producto con ID ${p.id} no encontrado`);
      }

      // if (producto.stock < p.cantidadVenta) {
      //   throw new Error(`Stock insuficiente para el producto: ${producto.nombre}`);
      // }

      producto.stock -= p.cantidadVenta;
      await this.oasisProductoRepo.save(producto);

      const detalle = new OasisSalesDetalle();
      detalle.productoName = producto.nombre;
      detalle.precio = p.precioVenta;
      detalle.cantidad = p.cantidadVenta;
      detalle.subtotal = p.precioVenta * p.cantidadVenta;
      detalle.fecha = new Date();
      detalle.oasisSale = savedVenta;
      detalle.oasisProducto = producto;
      detalle.anulado = false;
      detalles.push(detalle);
    }

    await this.oasisDetalleRepo.save(detalles);

    return { sale: savedVenta, detalles };
  }

  async findAll(filters?: { fechaInicio?: string; fechaFin?: string; userId?: number }) {
    const { fechaInicio, fechaFin, userId } = filters || {};

    const qb = this.oasisSaleRepo
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.user', 'user')
      .leftJoinAndSelect('s.oasisSalesDetalles', 'oasisSalesDetalles')
      .orderBy('s.fecha', 'DESC');

    // ---- Filtro por fecha (inclusivo) ----
    // Opción A (MySQL): usar DATE()
    if (fechaInicio && fechaFin) {
      qb.andWhere('DATE(s.fecha) BETWEEN :fi AND :ff', { fi: fechaInicio, ff: fechaFin });
    } else if (fechaInicio) {
      qb.andWhere('DATE(s.fecha) = :fi', { fi: fechaInicio });
    } else if (fechaFin) {
      qb.andWhere('DATE(s.fecha) = :ff', { ff: fechaFin });
    }

    // ---- Filtro por usuario ----
    if (typeof userId === 'number' && !Number.isNaN(userId)) {
      qb.andWhere('user.id = :uid', { uid: userId });
    }

    return qb.getMany();
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
    // reautsas producto
    const detalles = await this.oasisDetalleRepo.find({
      where: { oasisSale: { id: venta.id } },
      relations: ['oasisProducto'],
    });
    // console.log(detalles)
    for (const detalle of detalles) {
      const producto = await this.oasisProductoRepo.findOne({
        where: { id: detalle.oasisProducto.id },
      });
      if (producto) {
        producto.stock += detalle.cantidad;
        await this.oasisProductoRepo.save(producto);
      }
    }
    await this.oasisSaleRepo.save(venta);

    return 'Venta anulada correctamente';
  }
}
