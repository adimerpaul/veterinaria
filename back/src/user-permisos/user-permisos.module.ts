import { Module } from '@nestjs/common';
import { UserPermisosService } from './user-permisos.service';
import { UserPermisosController } from './user-permisos.controller';

@Module({
  controllers: [UserPermisosController],
  providers: [UserPermisosService],
})
export class UserPermisosModule {}
