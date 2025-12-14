import { Laboratorio } from './entities/laboratorio.entity';
import { Repository } from 'typeorm';
export declare class LaboratoriosService {
    private labRepo;
    constructor(labRepo: Repository<Laboratorio>);
    create(data: any): Promise<Laboratorio[]>;
    findAll(): Promise<Laboratorio[]>;
    findOne(id: number): Promise<Laboratorio | null>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
