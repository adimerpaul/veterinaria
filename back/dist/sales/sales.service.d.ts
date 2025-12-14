import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { Producto } from '../productos/entities/producto.entity';
import { DataSource, Repository } from 'typeorm';
import { Detail } from '../details/entities/detail.entity';
import { Mascota } from '../mascotas/entities/mascota.entity';
import { User } from '../users/entities/user.entity';
export declare class SalesService {
    private readonly salesRepository;
    private readonly detailRepository;
    private readonly mascotaRepository;
    private readonly userRepository;
    private readonly productoRepository;
    private dataSource;
    constructor(salesRepository: Repository<Sale>, detailRepository: Repository<Detail>, mascotaRepository: Repository<Mascota>, userRepository: Repository<User>, productoRepository: Repository<Producto>, dataSource: DataSource);
    imprimir(body: any): Promise<Detail[] | Sale[] | {
        error: any;
    } | undefined>;
    anular(id: number): Promise<{
        message: string;
        sale: Sale;
    }>;
    create(body: any, user: any): Promise<{
        message: string;
        sale: Sale;
    }>;
    findAll(fechaInicio: string, fechaFin: string, user_id: string): Promise<Sale[]>;
    findOne(id: number): string;
    update(id: number, updateSaleDto: UpdateSaleDto): string;
    remove(id: number): string;
}
