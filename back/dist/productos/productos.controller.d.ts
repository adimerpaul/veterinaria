import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    create(createProductoDto: CreateProductoDto): Promise<import("./entities/producto.entity").Producto[]>;
    findAll(page?: number, limit?: number, filter?: string, tipo?: string): Promise<{
        data: import("./entities/producto.entity").Producto[];
        total: number;
        last_page: number;
        current_page: number;
    }>;
    update(id: string, updateProductoDto: UpdateProductoDto): Promise<import("./entities/producto.entity").Producto | null>;
    remove(id: string): Promise<{
        id: number;
    }>;
    uploadImagen(id: number, file: any, body: any): Promise<import("./entities/producto.entity").Producto>;
    findAllProductos(): Promise<import("./entities/producto.entity").Producto[]>;
}
