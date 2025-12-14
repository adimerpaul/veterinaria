import { Repository } from 'typeorm';
import { Historiale } from './entities/historiale.entity';
export declare class HistorialesService {
    private readonly historialRepo;
    constructor(historialRepo: Repository<Historiale>);
    create(data: any): Promise<Historiale[]>;
    update(id: number, data: any): Promise<Historiale>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
