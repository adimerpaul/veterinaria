import { OasisSalesService } from './oasis-sales.service';
import { CreateOasisSaleDto } from './dto/create-oasis-sale.dto';
export declare class OasisSalesController {
    private readonly service;
    constructor(service: OasisSalesService);
    create(body: CreateOasisSaleDto, req: any): Promise<{
        sale: import("./entities/oasis-sale.entity").OasisSale;
        detalles: import("../oasis-sales-detalles/entities/oasis-sales-detalle.entity").OasisSalesDetalle[];
    }>;
    findAll(fechaInicio?: string, fechaFin?: string, userId?: string): Promise<import("./entities/oasis-sale.entity").OasisSale[]>;
    findOne(id: string): Promise<import("./entities/oasis-sale.entity").OasisSale | null>;
    remove(id: string): Promise<string>;
    anular(id: string, req: any): Promise<string>;
}
