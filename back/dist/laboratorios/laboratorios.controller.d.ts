import { LaboratoriosService } from './laboratorios.service';
export declare class LaboratoriosController {
    private readonly laboratoriosService;
    constructor(laboratoriosService: LaboratoriosService);
    create(body: any, file: any): Promise<import("./entities/laboratorio.entity").Laboratorio[]>;
    findAll(): Promise<import("./entities/laboratorio.entity").Laboratorio[]>;
    findOne(id: string): Promise<import("./entities/laboratorio.entity").Laboratorio | null>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
