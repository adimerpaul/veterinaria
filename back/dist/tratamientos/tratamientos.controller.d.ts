import { TratamientosService } from './tratamientos.service';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
export declare class TratamientosController {
    private readonly tratamientosService;
    constructor(tratamientosService: TratamientosService);
    create(body: any, req: Request): Promise<import("./entities/tratamiento.entity").Tratamiento[]>;
    findAll(fecha: string): Promise<import("./entities/tratamiento.entity").Tratamiento[]>;
    update(id: string, updateTratamientoDto: UpdateTratamientoDto): Promise<import("./entities/tratamiento.entity").Tratamiento | "No se encontró el tratamiento">;
    updatePagado(id: string, updateTratamientoDto: UpdateTratamientoDto): Promise<import("./entities/tratamiento.entity").Tratamiento | "No se encontró el tratamiento">;
    remove(id: string): Promise<"No se encontró el tratamiento" | "Tratamiento eliminado">;
    getReportePorDoctor(fecha: string): Promise<{}>;
}
