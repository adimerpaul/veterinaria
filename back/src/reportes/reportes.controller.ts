import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Producto } from '../productos/entities/producto.entity';
// import { Venta } from '../ventas/entities/venta.entity';
import { Sale } from '../sales/entities/sale.entity';
import { Historiale } from '../historiales/entities/historiale.entity';
@Controller('reportes')
export class ReportesController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    @InjectRepository(Sale)
    private ventasRepository: Repository<Sale>,
    @InjectRepository(Historiale)
    private historialRepository: Repository<Historiale>,
  ) {}

  @Get('resumen')
  async resumen() {
    const total_usuarios = await this.usersRepository.count();
    const total_productos = await this.productosRepository.count();
    const total_ventas = await this.ventasRepository.count();
    const total_historial = await this.historialRepository.count();

    // Ventas por mes (últimos 6 meses)
    const ventas_por_dia = await this.ventasRepository.query(`
      SELECT
        DATE_FORMAT(fecha, '%Y-%m-%d') as dia,
        COUNT(*) as total
      FROM sales
      WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
      GROUP BY dia
      ORDER BY dia
    `);

    return {
      total_usuarios,
      total_productos,
      total_ventas,
      total_historial,
      ventas_por_mes: ventas_por_dia.map((v) => ({
        dia: v.dia,
        total: Number(v.total),
      })),
    };
  }
}
