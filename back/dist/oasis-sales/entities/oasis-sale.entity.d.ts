import { User } from '../../users/entities/user.entity';
import { OasisSalesDetalle } from '../../oasis-sales-detalles/entities/oasis-sales-detalle.entity';
export declare class OasisSale {
    id: number;
    tipo: string;
    comentarioDoctor: string;
    fecha: Date;
    fechaCreacion: Date;
    facturado: boolean;
    nombre: string;
    comentario: string;
    ci: string;
    total: number;
    anulado: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
    oasisSalesDetalles: OasisSalesDetalle[];
}
