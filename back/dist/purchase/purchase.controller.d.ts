import { PurchasesService } from './purchase.service';
export declare class PurchasesController {
    private readonly service;
    constructor(service: PurchasesService);
    create(body: any, req: any): Promise<{
        message: string;
        purchase: import("./entities/purchase.entity").Purchase;
    }>;
    findAll(fi: string, ff: string, user_id?: string): Promise<import("./entities/purchase.entity").Purchase[]>;
    imprimir(body: any): Promise<import("../purchase-detail/entities/purchase-detail.entity").PurchaseDetail[] | import("./entities/purchase.entity").Purchase[]>;
    anular(id: string): Promise<{
        message: string;
        purchase: import("./entities/purchase.entity").Purchase;
    }>;
}
