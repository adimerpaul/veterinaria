import { HistorialesService } from './historiales.service';
export declare class HistorialesController {
    private readonly historialesService;
    constructor(historialesService: HistorialesService);
    create(body: any, req: any): Promise<import("./entities/historiale.entity").Historiale[]>;
    update(id: string, body: any): Promise<import("./entities/historiale.entity").Historiale>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
