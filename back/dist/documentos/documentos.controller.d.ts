import { DocumentosService } from './documentos.service';
export declare class DocumentosController {
    private readonly documentosService;
    constructor(documentosService: DocumentosService);
    create(body: any, req: Request): Promise<import("./entities/documento.entity").Documento[]>;
    findOne(id: string): Promise<import("./entities/documento.entity").Documento>;
    update(id: string, body: any): Promise<import("./entities/documento.entity").Documento>;
}
