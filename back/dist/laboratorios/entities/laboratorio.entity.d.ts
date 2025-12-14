import { User } from '../../users/entities/user.entity';
import { Mascota } from '../../mascotas/entities/mascota.entity';
export declare class Laboratorio {
    id: number;
    fecha: Date;
    observaciones: string;
    src: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
    mascota: Mascota;
}
