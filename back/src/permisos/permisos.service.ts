import { Injectable } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';
import { UserPermiso } from '../user-permisos/entities/user-permiso.entity';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private permisosRepository: Repository<Permiso>,
    @InjectRepository(UserPermiso)
    private userPermisosRepository: Repository<UserPermiso>,
  ) {}
  async create(body) {
    const user_id = body.user_id;
    const permissions = body.permissions;
    // console.log('user_id', user_id);
    await this.userPermisosRepository.delete({ userId: user_id });
    for (const permission of permissions) {
      // console.log('permiso', permission);
      // const permiso = await this.permisosRepository.findOne({
      //   where: { id: permission },
      // });
      // if (!permiso) {
      //   throw new Error(`Permiso with id ${permission} not found`);
      // }
      const userPermiso = this.userPermisosRepository.create({
        userId: user_id,
        permisoId: permission,
      });
      await this.userPermisosRepository.save(userPermiso);
    }
  }

  async findAll() {
    const permisos = await this.permisosRepository.find();
    return permisos.map((permiso) => {
      return {
        id: permiso.id,
        nombre: permiso.nombre,
        // descripcion: permiso.descripcion,
      };
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} permiso`;
  }

  update(id: number, updatePermisoDto: UpdatePermisoDto) {
    return `This action updates a #${id} permiso`;
  }

  remove(id: number) {
    return `This action removes a #${id} permiso`;
  }
}
