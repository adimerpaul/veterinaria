import { DataSource, Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { User } from '../users/entities/user.entity';
import { Producto } from '../productos/entities/producto.entity';
import { PurchaseDetail } from '../purchase-detail/entities/purchase-detail.entity';
export declare class PurchasesService {
    private readonly purchaseRepo;
    private readonly pdetailRepo;
    private readonly userRepo;
    private readonly productoRepo;
    private readonly dataSource;
    constructor(purchaseRepo: Repository<Purchase>, pdetailRepo: Repository<PurchaseDetail>, userRepo: Repository<User>, productoRepo: Repository<Producto>, dataSource: DataSource);
    create(body: any, user: any): Promise<{
        message: string;
        purchase: Purchase;
    }>;
    findAll(fechaInicio: string, fechaFin: string, user_id?: string): Promise<Purchase[]>;
    imprimir(body: any): Promise<PurchaseDetail[] | Purchase[]>;
    anular(id: number): Promise<{
        message: string;
        purchase: Purchase;
    }>;
}
