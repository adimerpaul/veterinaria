import { User } from '../../users/entities/user.entity';
import { Permiso } from '../../permisos/entities/permiso.entity';
export declare class UserPermiso {
    id: number;
    userId: number;
    permisoId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
    permiso: Permiso;
}
