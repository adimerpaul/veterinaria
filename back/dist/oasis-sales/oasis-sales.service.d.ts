import { Repository } from 'typeorm';
import { OasisSale } from './entities/oasis-sale.entity';
import { OasisSalesDetalle } from '../oasis-sales-detalles/entities/oasis-sales-detalle.entity';
import { OasisProducto } from '../oasis-productos/entities/oasis-producto.entity';
export declare class OasisSalesService {
    private oasisSaleRepo;
    private oasisDetalleRepo;
    private oasisProductoRepo;
    constructor(oasisSaleRepo: Repository<OasisSale>, oasisDetalleRepo: Repository<OasisSalesDetalle>, oasisProductoRepo: Repository<OasisProducto>);
    create(createOasisSaleDto: any): Promise<{
        sale: OasisSale;
        detalles: OasisSalesDetalle[];
    }>;
    findAll(filters?: {
        fechaInicio?: string;
        fechaFin?: string;
        userId?: number;
    }): Promise<OasisSale[]>;
    findOne(id: number): Promise<OasisSale | null>;
    remove(id: number): Promise<string>;
    anular(id: number, userId: number): Promise<string>;
}
