import { UserPermisosService } from './user-permisos.service';
import { CreateUserPermisoDto } from './dto/create-user-permiso.dto';
export declare class UserPermisosController {
    private readonly userPermisosService;
    constructor(userPermisosService: UserPermisosService);
    create(createUserPermisoDto: CreateUserPermisoDto): string;
    remove(id: string): string;
}
