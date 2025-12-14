import { User } from '../../users/entities/user.entity';
import { Mascota } from '../../mascotas/entities/mascota.entity';
export declare class Foto {
    id: number;
    fecha: Date;
    observaciones: string;
    imagen: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
    mascota: Mascota;
}
