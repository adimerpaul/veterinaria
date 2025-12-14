import { DesparacitacionesService } from './desparacitaciones.service';
export declare class DesparacitacionesController {
    private readonly desparacitacionesService;
    constructor(desparacitacionesService: DesparacitacionesService);
    create(body: any, req: Request): Promise<import("./entities/desparacitacione.entity").Desparacitacione[]>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
