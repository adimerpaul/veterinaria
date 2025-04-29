import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPermisoDto } from './create-user-permiso.dto';

export class UpdateUserPermisoDto extends PartialType(CreateUserPermisoDto) {}
