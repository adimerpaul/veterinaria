import { OasisProductosService } from './oasis-productos.service';
import { CreateOasisProductoDto } from './dto/create-oasis-producto.dto';
import { UpdateOasisProductoDto } from './dto/update-oasis-producto.dto';
export declare class OasisProductosController {
    private readonly service;
    constructor(service: OasisProductosService);
    create(body: CreateOasisProductoDto): Promise<import("./entities/oasis-producto.entity").OasisProducto>;
    findAll(query: any): Promise<import("./entities/oasis-producto.entity").OasisProducto[]>;
    update(id: number, body: UpdateOasisProductoDto): Promise<import("./entities/oasis-producto.entity").OasisProducto | null>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
    findOne(id: number): Promise<import("./entities/oasis-producto.entity").OasisProducto | null>;
}
