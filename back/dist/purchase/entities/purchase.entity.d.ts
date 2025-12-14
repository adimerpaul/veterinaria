import { User } from '../../users/entities/user.entity';
import { PurchaseDetail } from '../../purchase-detail/entities/purchase-detail.entity';
export declare class Purchase {
    id: number;
    tipo: string;
    pago: string;
    comentario: string;
    fecha: Date;
    fechaCreacion: Date;
    proveedor: string;
    total: number;
    anulado: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
    details: PurchaseDetail[];
}
