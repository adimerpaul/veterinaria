import { User } from '../../users/entities/user.entity';
import { OasisProducto } from '../../oasis-productos/entities/oasis-producto.entity';
import { OasisSale } from '../../oasis-sales/entities/oasis-sale.entity';
export declare class OasisSalesDetalle {
    id: number;
    fecha: Date;
    productoName: string;
    subtotal: number;
    precio: number;
    cantidad: number;
    anulado: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
    oasisSale: OasisSale;
    oasisProducto: OasisProducto;
}
