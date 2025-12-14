import { Mascota } from '../../mascotas/entities/mascota.entity';
import { User } from '../../users/entities/user.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { Producto } from '../../productos/entities/producto.entity';
export declare class Detail {
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
    mascota: Mascota;
    user: User;
    sale: Sale;
    producto: Producto;
}
