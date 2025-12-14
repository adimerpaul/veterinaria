import { Mascota } from './entities/mascota.entity';
import { Repository } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { Detail } from '../details/entities/detail.entity';
import { Sale } from '../sales/entities/sale.entity';
import { Historiale } from '../historiales/entities/historiale.entity';
export declare class MascotasService {
    private mascotasRepository;
    private productosRepository;
    private detailsRepository;
    private salesRepository;
    private historialesRepository;
    constructor(mascotasRepository: Repository<Mascota>, productosRepository: Repository<Producto>, detailsRepository: Repository<Detail>, salesRepository: Repository<Sale>, historialesRepository: Repository<Historiale>);
    historialMascota(mascotaId: any): Promise<Historiale[] | null>;
    historial(body: any): Promise<Sale[] | null>;
    create(body: any): Promise<Mascota[]>;
    findAll(page?: number, limit?: number, filter?: string): Promise<{
        data: Mascota[];
        total: number;
        last_page: number;
        current_page: number;
    }>;
    findOne(id: number): Promise<Mascota | null>;
    update(id: number, body: any): Promise<Mascota | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findSales(id: number): Promise<Sale[]>;
    findProductosEspeciales(id: number): Promise<Detail[]>;
    findDocumentos(id: number): Promise<import("../documentos/entities/documento.entity").Documento[]>;
}
