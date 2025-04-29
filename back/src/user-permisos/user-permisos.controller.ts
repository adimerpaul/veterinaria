import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserPermisosService } from './user-permisos.service';
import { CreateUserPermisoDto } from './dto/create-user-permiso.dto';
import { UpdateUserPermisoDto } from './dto/update-user-permiso.dto';

@Controller('user-permisos')
export class UserPermisosController {
  constructor(private readonly userPermisosService: UserPermisosService) {}

  @Post()
  create(@Body() createUserPermisoDto: CreateUserPermisoDto) {
    return this.userPermisosService.create(createUserPermisoDto);
  }

  @Get()
  findAll() {
    return this.userPermisosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPermisosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserPermisoDto: UpdateUserPermisoDto,
  ) {
    return this.userPermisosService.update(+id, updateUserPermisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPermisosService.remove(+id);
  }
}
