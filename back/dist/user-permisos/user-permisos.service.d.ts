import { CreateUserPermisoDto } from './dto/create-user-permiso.dto';
import { UpdateUserPermisoDto } from './dto/update-user-permiso.dto';
export declare class UserPermisosService {
    create(createUserPermisoDto: CreateUserPermisoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserPermisoDto: UpdateUserPermisoDto): string;
    remove(id: number): string;
}
