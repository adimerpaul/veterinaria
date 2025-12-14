import { CreateOasisProductoDto } from './dto/create-oasis-producto.dto';
import { UpdateOasisProductoDto } from './dto/update-oasis-producto.dto';
import { OasisProducto } from './entities/oasis-producto.entity';
import { Repository } from 'typeorm';
export declare class OasisProductosService {
    private oasisProductoRepository;
    constructor(oasisProductoRepository: Repository<OasisProducto>);
    create(data: CreateOasisProductoDto): Promise<OasisProducto>;
    findAll(params: {
        filter?: string;
        tipo?: string;
        page?: number;
        limit?: number;
    }): Promise<OasisProducto[]>;
    update(id: number, data: UpdateOasisProductoDto): Promise<OasisProducto | null>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
    findOne(id: number): Promise<OasisProducto | null>;
}
