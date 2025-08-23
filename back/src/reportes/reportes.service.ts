import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';
// import { PurchaseDetail } from '../purchase-details/entities/purchase-detail.entity';
import { Detail } from '../details/entities/detail.entity';
import { PurchaseDetail } from 'src/purchase-detail/entities/purchase-detail.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,

    @InjectRepository(PurchaseDetail)
    private readonly pdetailRepo: Repository<PurchaseDetail>,

    @InjectRepository(Detail)
    private readonly sdetailRepo: Repository<Detail>,
  ) {}

  async almacenPorDia(fecha: string) {
    if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      const tz = new Date();
      const y = tz.getFullYear();
      const m = String(tz.getMonth() + 1).padStart(2, '0');
      const d = String(tz.getDate()).padStart(2, '0');
      fecha = `${y}-${m}-${d}`;
    }
    const desde = new Date(`${fecha} 00:00:00`);
    const hasta = new Date(`${fecha} 23:59:59`);

    // 1) Productos tipo "Producto"
    const productos = await this.productosRepository.find({
      where: { tipo: 'Producto' as any },
      order: { nombre: 'ASC' },
    });
    if (productos.length === 0) return [];

    const ids = productos.map((p) => p.id);

    // 2) Compras del día
    const comprasRows = await this.pdetailRepo
      .createQueryBuilder('pd')
      .select('pd.productoId', 'productoId')
      .addSelect('SUM(pd.cantidad)', 'comprado')
      .where('pd.productoId IN (:...ids)', { ids })
      .andWhere('pd.anulado = 0')
      .andWhere('pd.fecha BETWEEN :desde AND :hasta', { desde, hasta })
      .groupBy('pd.productoId')
      .getRawMany<{ productoId: number; comprado: string }>();

    // 3) Ventas del día
    const ventasRows = await this.sdetailRepo
      .createQueryBuilder('sd')
      .select('sd.productoId', 'productoId')
      .addSelect('SUM(sd.cantidad)', 'vendido')
      .where('sd.productoId IN (:...ids)', { ids })
      .andWhere('sd.anulado = 0')
      .andWhere('sd.fecha BETWEEN :desde AND :hasta', { desde, hasta })
      .groupBy('sd.productoId')
      .getRawMany<{ productoId: number; vendido: string }>();

    const comprasMap = new Map<number, number>();
    comprasRows.forEach((r) =>
      comprasMap.set(r.productoId, Number(r.comprado) || 0),
    );

    const ventasMap = new Map<number, number>();
    ventasRows.forEach((r) =>
      ventasMap.set(r.productoId, Number(r.vendido) || 0),
    );

    // 4) Resultado final
    return productos.map((p) => ({
      id: p.id,
      codigo: (p as any).codigo ?? '',
      nombre: p.nombre,
      presentacion: (p as any).presentacion ?? '',
      contenido: (p as any).contenido ?? '',
      pc: (p as any).precioCompra ?? null,
      pv: (p as any).precioVenta ?? null,
      stock: (p as any).stock ?? 0,
      comprado: comprasMap.get(p.id) || 0,
      vendido: ventasMap.get(p.id) || 0,
      fecha,
    }));
  }
}
