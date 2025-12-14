import { Repository } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { Detail } from '../details/entities/detail.entity';
import { PurchaseDetail } from 'src/purchase-detail/entities/purchase-detail.entity';
export declare class ReportesService {
    private readonly productosRepository;
    private readonly pdetailRepo;
    private readonly sdetailRepo;
    constructor(productosRepository: Repository<Producto>, pdetailRepo: Repository<PurchaseDetail>, sdetailRepo: Repository<Detail>);
    almacenPorDia(fecha: string): Promise<{
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
}
