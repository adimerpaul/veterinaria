import { VacunasService } from './vacunas.service';
export declare class VacunasController {
    private readonly vacunasService;
    constructor(vacunasService: VacunasService);
    create(body: any, req: Request): Promise<import("./entities/vacuna.entity").Vacuna[]>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
    getProximasVacunas(dias?: number): Promise<import("./entities/vacuna.entity").Vacuna[]>;
}
