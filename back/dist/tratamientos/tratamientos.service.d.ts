import { Tratamiento } from './entities/tratamiento.entity';
import { Repository } from 'typeorm';
import { TratamientoMedicamento } from '../tratamiento-medicamentos/entities/tratamiento-medicamento.entity';
import { Producto } from '../productos/entities/producto.entity';
export declare class TratamientosService {
    private tratamientosRepository;
    private tratamientoMedicamentoRepository;
    private productoRepository;
    constructor(tratamientosRepository: Repository<Tratamiento>, tratamientoMedicamentoRepository: Repository<TratamientoMedicamento>, productoRepository: Repository<Producto>);
    create(body: any, req: any): Promise<Tratamiento[]>;
    updatePagado(id: number, updateTratamientoDto: any): Promise<Tratamiento | "No se encontró el tratamiento">;
    update(id: number, updateTratamientoDto: any): Promise<Tratamiento | "No se encontró el tratamiento">;
    findAllByFecha(fecha: string): Promise<Tratamiento[]>;
    remove(id: number): Promise<"No se encontró el tratamiento" | "Tratamiento eliminado">;
    reporteTratamientosPorDoctor(fecha: string): Promise<{}>;
}
