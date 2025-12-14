import { Vacuna } from './entities/vacuna.entity';
import { Repository } from 'typeorm';
export declare class VacunasService {
    private readonly vacunaRepository;
    constructor(vacunaRepository: Repository<Vacuna>);
    create(body: any, req: any): Promise<Vacuna[]>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
    findProximasVacunas(dias?: number): Promise<Vacuna[]>;
}
