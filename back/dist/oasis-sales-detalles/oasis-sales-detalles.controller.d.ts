import { OasisSalesDetallesService } from './oasis-sales-detalles.service';
import { CreateOasisSalesDetalleDto } from './dto/create-oasis-sales-detalle.dto';
import { UpdateOasisSalesDetalleDto } from './dto/update-oasis-sales-detalle.dto';
export declare class OasisSalesDetallesController {
    private readonly oasisSalesDetallesService;
    constructor(oasisSalesDetallesService: OasisSalesDetallesService);
    create(createOasisSalesDetalleDto: CreateOasisSalesDetalleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOasisSalesDetalleDto: UpdateOasisSalesDetalleDto): string;
    remove(id: string): string;
}
