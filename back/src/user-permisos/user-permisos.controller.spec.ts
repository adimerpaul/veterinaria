import { Test, TestingModule } from '@nestjs/testing';
import { UserPermisosController } from './user-permisos.controller';
import { UserPermisosService } from './user-permisos.service';

describe('UserPermisosController', () => {
  let controller: UserPermisosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPermisosController],
      providers: [UserPermisosService],
    }).compile();

    controller = module.get<UserPermisosController>(UserPermisosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
