import { Mascota } from '../../mascotas/entities/mascota.entity';
import { User } from '../../users/entities/user.entity';
export declare class Documento {
    id: number;
    nombre: string;
    html: string;
    fechaCreacion: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    mascota: Mascota;
    user: User;
}
