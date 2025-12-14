import { User } from '../../users/entities/user.entity';
import { Mascota } from '../../mascotas/entities/mascota.entity';
export declare class Desparacitacione {
    id: number;
    fecha: string;
    peso: string;
    medicamentos: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
    mascota: Mascota;
}
