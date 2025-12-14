import { SalesService } from './sales.service';
import { UpdateSaleDto } from './dto/update-sale.dto';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(body: any, req: any): Promise<{
        message: string;
        sale: import("./entities/sale.entity").Sale;
    }>;
    imprimir(body: any): Promise<import("../details/entities/detail.entity").Detail[] | import("./entities/sale.entity").Sale[] | {
        error: any;
    } | undefined>;
    findAll(fechaInicio?: string, fechaFin?: string, user_id?: string): Promise<import("./entities/sale.entity").Sale[]>;
    findOne(id: string): string;
    update(id: string, updateSaleDto: UpdateSaleDto): string;
    anular(id: string): Promise<{
        message: string;
        sale: import("./entities/sale.entity").Sale;
    }>;
    remove(id: string): string;
}
