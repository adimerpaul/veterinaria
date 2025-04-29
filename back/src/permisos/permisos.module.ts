import { Module } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { UserPermiso } from '../user-permisos/entities/user-permiso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permiso, UserPermiso])],
  controllers: [PermisosController],
  providers: [PermisosService],
})
export class PermisosModule {}
