import { Mascota } from '../../mascotas/entities/mascota.entity';
import { User } from '../../users/entities/user.entity';
import { Detail } from '../../details/entities/detail.entity';
export declare class Sale {
    id: number;
    tipo: string;
    pago: string;
    comentarioDoctor: string;
    fecha: Date;
    fechaCreacion: Date;
    facturado: boolean;
    nombre: string;
    ci: string;
    total: number;
    anulado: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    mascota: Mascota;
    user: User;
    details: Detail[];
}
