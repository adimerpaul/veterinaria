import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';
import { UserPermiso } from '../user-permisos/entities/user-permiso.entity';
export declare class PermisosService {
    private permisosRepository;
    private userPermisosRepository;
    constructor(permisosRepository: Repository<Permiso>, userPermisosRepository: Repository<UserPermiso>);
    create(body: any): Promise<void>;
    findAll(): Promise<{
        id: number;
        nombre: string;
    }[]>;
    findOne(id: number): string;
    update(id: number, updatePermisoDto: UpdatePermisoDto): string;
    remove(id: number): string;
}
