import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { TratamientoMedicamento } from '../tratamiento-medicamentos/entities/tratamiento-medicamento.entity';
export declare class ProductosService {
    private productosRepository;
    private tratamientoMedicamentoRepository;
    constructor(productosRepository: Repository<Producto>, tratamientoMedicamentoRepository: Repository<TratamientoMedicamento>);
    create(body: any): Promise<Producto[]>;
    findAll(page?: number, limit?: number, filter?: string, tipo?: string): Promise<{
        data: Producto[];
        total: number;
        last_page: number;
        current_page: number;
    }>;
    update(id: number, body: any): Promise<Producto | null>;
    remove(id: number): Promise<{
        id: number;
    }>;
    findAllProductos(): Promise<Producto[]>;
    cambiarImagen(id: number, filename: string): Promise<Producto>;
}
