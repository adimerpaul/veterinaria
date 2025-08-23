import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Sale } from '../sales/entities/sale.entity';
import { Historiale } from '../historiales/entities/historiale.entity';
import { ReportesService } from './reportes.service';

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

    private readonly reportesService: ReportesService,
  ) {}

  @Get('resumen')
  async resumen() {
    const total_usuarios = await this.usersRepository.count();
    const total_productos = await this.productosRepository.count();
    const total_ventas = await this.ventasRepository.count();
    const total_historial = await this.historialRepository.count();

    const ventas_por_dia = await this.ventasRepository.query(`
      SELECT DATE_FORMAT(fecha, '%Y-%m-%d') as dia, COUNT(*) as total
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

  @Get('almacen-dia')
  async almacenDia(@Query('fecha') fecha: string) {
    return this.reportesService.almacenPorDia(fecha);
  }

  /**
   * Reporte de tratamientos por doctor (día) con medicamentos usados.
   * Devuelve: { [doctor: string]: Array<{ nroFicha, detalle, costo, medicamentos[] }> }
   */
  @Get('tratamientos-por-doctor')
  async tratamientosPorDoctor(@Query('fecha') fecha?: string) {
    // Default = hoy si no mandan fecha válida
    if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      fecha = `${y}-${m}-${d}`;
    }

    // Query (MySQL) que trae tratamientos y sus medicamentos/productos
    const rows: Array<{
      doctor: string | null;
      tid: number;
      nroFicha: number | null;
      detalle: string | null;
      costo: number | string | null;
      med_nombre: string | null;
      med_cant: number | string | null;
      med_precio: number | string | null;
      med_total: number | string | null;
      prod_nombre: string | null;
    }> = await this.ventasRepository.query(
      `
      SELECT
        COALESCE(u.name, u.username, 'Sin Doctor') AS doctor,
        t.id AS tid,
        t.historialeId AS nroFicha,
        COALESCE(t.observaciones, t.comentario, '') AS detalle,
        t.costo,
        tm.medicamento       AS med_nombre,
        tm.cantidad          AS med_cant,
        tm.precio            AS med_precio,
        tm.total             AS med_total,
        p.nombre             AS prod_nombre
      FROM tratamientos t
      LEFT JOIN users u ON u.id = t.userId
      LEFT JOIN tratamiento_medicamentos tm ON tm.tratamientoId = t.id
      LEFT JOIN productos p ON p.id = tm.productoId
      WHERE DATE(t.fecha) = ?
      ORDER BY doctor ASC, t.fecha ASC, t.id ASC, tm.id ASC
      `,
      [fecha],
    );

    // Armamos -> doctor -> tratamientos (por tid)
    const grouped: Record<string, Array<{
      nroFicha: number | null;
      detalle: string;
      costo: number;
      medicamentos: Array<{
        medicamento: string | null;
        cantidad: number;
        precio: number;
        total: number;
        productoNombre: string | null;
      }>;
    }>> = {};

    // Mapa temporal doctor->tid para agrupar meds dentro del mismo tratamiento
    const tempMaps = new Map<string, Map<number, any>>();

    for (const r of rows) {
      const doctor = r.doctor || 'Sin Doctor';
      if (!grouped[doctor]) {
        grouped[doctor] = [];
        tempMaps.set(doctor, new Map());
      }
      const byTid = tempMaps.get(doctor)!;

      if (!byTid.has(r.tid)) {
        const obj = {
          nroFicha: r.nroFicha ?? null,
          detalle: r.detalle ?? '',
          costo: Number(r.costo ?? 0),
          medicamentos: [] as any[],
        };
        byTid.set(r.tid, obj);
        grouped[doctor].push(obj);
      }

      // Si hay medicamento, lo añadimos (puede ser null si no registraron)
      if (r.med_nombre || r.prod_nombre) {
        byTid.get(r.tid).medicamentos.push({
          medicamento: r.med_nombre,
          cantidad: Number(r.med_cant ?? 0),
          precio: Number(r.med_precio ?? 0),
          total: Number(r.med_total ?? 0),
          productoNombre: r.prod_nombre ?? null,
        });
      }
    }

    return grouped;
  }
}
