import { Documento } from './entities/documento.entity';
import { Repository } from 'typeorm';
import { Mascota } from "../mascotas/entities/mascota.entity";
export declare class DocumentosService {
    private documentoRepository;
    private mascotaRepository;
    constructor(documentoRepository: Repository<Documento>, mascotaRepository: Repository<Mascota>);
    create(body: any, req: any): Promise<Documento[]>;
    findAll(): string;
    findOne(id: number): Promise<Documento>;
    update(id: number, body: any): Promise<Documento>;
    remove(id: number): string;
}
