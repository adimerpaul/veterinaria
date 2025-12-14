import { User } from '../../users/entities/user.entity';
import { Historiale } from '../../historiales/entities/historiale.entity';
import { TratamientoMedicamento } from '../../tratamiento-medicamentos/entities/tratamiento-medicamento.entity';
export declare class Tratamiento {
    id: number;
    observaciones: string;
    comentario: string;
    fecha: Date;
    costo: number;
    pagado: boolean;
    user: User;
    historiale: Historiale;
    tratamientoMedicamentos: TratamientoMedicamento[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
