import { PermisosService } from './permisos.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
export declare class PermisosController {
    private readonly permisosService;
    constructor(permisosService: PermisosService);
    create(createPermisoDto: CreatePermisoDto): Promise<void>;
    findAll(): Promise<{
        id: number;
        nombre: string;
    }[]>;
}
