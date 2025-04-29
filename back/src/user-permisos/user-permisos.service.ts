import { Injectable } from '@nestjs/common';
import { CreateUserPermisoDto } from './dto/create-user-permiso.dto';
import { UpdateUserPermisoDto } from './dto/update-user-permiso.dto';

@Injectable()
export class UserPermisosService {
  create(createUserPermisoDto: CreateUserPermisoDto) {
    return 'This action adds a new userPermiso';
  }

  findAll() {
    return `This action returns all userPermisos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPermiso`;
  }

  update(id: number, updateUserPermisoDto: UpdateUserPermisoDto) {
    return `This action updates a #${id} userPermiso`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPermiso`;
  }
}
