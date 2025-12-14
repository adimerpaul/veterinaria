import { MascotasService } from './mascotas.service';
export declare class MascotasController {
    private readonly mascotasService;
    constructor(mascotasService: MascotasService);
    historial(id: string): Promise<import("../historiales/entities/historiale.entity").Historiale[] | null>;
    create(body: any, file: any): Promise<import("./entities/mascota.entity").Mascota[]>;
    createHistorial(body: any): Promise<import("../sales/entities/sale.entity").Sale[] | null>;
    findAll(page?: number, limit?: number, filter?: string): Promise<{
        data: import("./entities/mascota.entity").Mascota[];
        total: number;
        last_page: number;
        current_page: number;
    }>;
    findOne(id: string): Promise<import("./entities/mascota.entity").Mascota | null>;
    update(id: number, body: any, file: any): Promise<import("./entities/mascota.entity").Mascota | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    findSales(id: string): Promise<import("../sales/entities/sale.entity").Sale[]>;
    findProductosEspeciales(id: string): Promise<import("../details/entities/detail.entity").Detail[]>;
    findDocumentos(id: string): Promise<import("../documentos/entities/documento.entity").Documento[]>;
    getBase64(id: string): Promise<string | null>;
}
