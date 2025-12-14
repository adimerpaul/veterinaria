import { User } from '../../users/entities/user.entity';
import { Mascota } from '../../mascotas/entities/mascota.entity';
export declare class Vacuna {
    id: number;
    fechaVacuna: string;
    fechaProximaVacuna: string;
    nombreVacuna: string;
    dosis: string;
    observaciones: string;
    otro: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
    mascota: Mascota;
}
