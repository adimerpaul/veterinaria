import { Repository } from 'typeorm';
import { Desparacitacione } from './entities/desparacitacione.entity';
export declare class DesparacitacionesService {
    private readonly desparasitacionRepository;
    constructor(desparasitacionRepository: Repository<Desparacitacione>);
    create(body: any, req: any): Promise<Desparacitacione[]>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
