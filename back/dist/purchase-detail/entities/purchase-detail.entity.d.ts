import { User } from '../../users/entities/user.entity';
import { Purchase } from '../../purchase/entities/purchase.entity';
import { Producto } from '../../productos/entities/producto.entity';
export declare class PurchaseDetail {
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
    purchase: Purchase;
    producto: Producto;
}
