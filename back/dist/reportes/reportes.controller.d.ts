import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Sale } from '../sales/entities/sale.entity';
import { Historiale } from '../historiales/entities/historiale.entity';
import { ReportesService } from './reportes.service';
export declare class ReportesController {
    private usersRepository;
    private productosRepository;
    private ventasRepository;
    private historialRepository;
    private readonly reportesService;
    constructor(usersRepository: Repository<User>, productosRepository: Repository<Producto>, ventasRepository: Repository<Sale>, historialRepository: Repository<Historiale>, reportesService: ReportesService);
    resumen(): Promise<{
        total_usuarios: number;
        total_productos: number;
        total_ventas: number;
        total_historial: number;
        ventas_por_mes: any;
    }>;
    almacenDia(fecha: string): Promise<{
        id: number;
        codigo: any;
        nombre: string;
        presentacion: any;
        contenido: any;
        pc: any;
        pv: any;
        stock: any;
        comprado: number;
        vendido: number;
        fecha: string;
    }[]>;
    tratamientosPorDoctor(fecha?: string): Promise<Record<string, {
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
    }[]>>;
}
