import { UserPermiso } from '../../user-permisos/entities/user-permiso.entity';
export declare class Permiso {
    id: number;
    nombre: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    userPermisos: UserPermiso[];
}
