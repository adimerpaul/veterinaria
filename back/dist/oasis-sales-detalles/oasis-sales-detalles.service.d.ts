import { CreateOasisSalesDetalleDto } from './dto/create-oasis-sales-detalle.dto';
import { UpdateOasisSalesDetalleDto } from './dto/update-oasis-sales-detalle.dto';
export declare class OasisSalesDetallesService {
    create(createOasisSalesDetalleDto: CreateOasisSalesDetalleDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOasisSalesDetalleDto: UpdateOasisSalesDetalleDto): string;
    remove(id: number): string;
}
