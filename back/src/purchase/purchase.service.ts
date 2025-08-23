import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { User } from '../users/entities/user.entity';
import { Producto } from '../productos/entities/producto.entity';
import { PurchaseDetail } from '../purchase-detail/entities/purchase-detail.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepo: Repository<Purchase>,
    @InjectRepository(PurchaseDetail)
    private readonly pdetailRepo: Repository<PurchaseDetail>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
    private readonly dataSource: DataSource,
  ) {}

  async create(body: any, user: any) {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      const userEntity = await qr.manager.findOne(User, {
        where: { id: user.userId },
      });
      if (!userEntity) throw new Error('Usuario no encontrado');

      const total = parseFloat(body.total);
      if (isNaN(total)) throw new Error('Total inválido');

      const purchase = qr.manager.create(Purchase, {
        tipo: 'Compra',
        pago: body.pago || 'Efectivo',
        comentario: body.comentario || '',
        proveedor: body.proveedor || 'SN',
        fecha: new Date(),
        fechaCreacion: new Date(),
        total,
        anulado: false,
        user: userEntity,
      });

      const savedPurchase = await qr.manager.save(Purchase, purchase);

      const details: PurchaseDetail[] = [];
      for (const item of body.productos) {
        const producto = await qr.manager.findOne(Producto, {
          where: { id: item.id },
        });
        if (!producto) throw new Error(`Producto ${item.id} no encontrado`);

        const cantidad = parseInt(
          item.cantidadCompra ?? item.cantidad ?? item.cantidadVenta ?? 0,
        );
        const precio = parseFloat(
          item.precioCompra ??
            item.precio ??
            item.precioVenta ??
            producto['precioCompra'] ??
            0,
        );
        if (isNaN(cantidad) || isNaN(precio))
          throw new Error(
            `Cantidad o precio inválido en producto ${producto.nombre}`,
          );

        const det = qr.manager.create(PurchaseDetail, {
          fecha: new Date(),
          productoName: producto.nombre,
          cantidad,
          precio,
          subtotal: cantidad * precio,
          anulado: false,
          user: userEntity,
          purchase: savedPurchase,
          producto,
        });
        await qr.manager.save(PurchaseDetail, det);
        details.push(det);

        // COMPRA incrementa stock
        producto.stock += cantidad;
        await qr.manager.save(Producto, producto);
      }

      savedPurchase.details = details;
      await qr.commitTransaction();

      return {
        message: 'Compra registrada exitosamente',
        purchase: savedPurchase,
      };
    } catch (e) {
      await qr.rollbackTransaction();
      throw new InternalServerErrorException(e.message);
    } finally {
      await qr.release();
    }
  }

  async findAll(fechaInicio: string, fechaFin: string, user_id?: string) {
    const fi = new Date(fechaInicio + ' 00:00:00');
    const ff = new Date(fechaFin + ' 23:59:59');

    const where: any = { fecha: Between(fi, ff) };
    if (user_id) where.user = { id: user_id };

    return await this.purchaseRepo.find({
      where,
      relations: ['user', 'details.producto'],
      order: { fecha: 'DESC' },
    });
  }

  async imprimir(body: any) {
    const fi = new Date(body.fechaInicio + ' 00:00:00');
    const ff = new Date(body.fechaFin + ' 23:59:59');
    const where: any = { fecha: Between(fi, ff), anulado: false };
    if (body.user_id) where.user = { id: body.user_id };

    if (body.reporte === 'PRODUCTOS') {
      return await this.pdetailRepo.find({
        where,
        relations: ['user', 'purchase', 'producto'],
        order: { fecha: 'DESC' },
      });
    }
    // CAJA = compras agregadas
    return await this.purchaseRepo.find({
      where,
      relations: ['user', 'details'],
      order: { fecha: 'DESC' },
    });
  }

  async anular(id: number) {
    const purchase = await this.purchaseRepo.findOne({
      where: { id },
      relations: ['details.producto'],
    });
    if (!purchase) throw new Error('Compra no encontrada');
    if (purchase.anulado)
      return { message: 'La compra ya estaba anulada', purchase };

    purchase.anulado = true;

    for (const d of purchase.details) {
      d.anulado = true;
      await this.pdetailRepo.save(d);

      const prod = await this.productoRepo.findOne({
        where: { id: d.producto.id },
      });
      if (prod) {
        // Revertir incremento de stock de la compra
        prod.stock = Math.max(0, (prod.stock ?? 0) - d.cantidad);
        await this.productoRepo.save(prod);
      }
    }

    await this.purchaseRepo.save(purchase);
    return { message: 'Compra anulada exitosamente', purchase };
  }
}
