import { Test, TestingModule } from '@nestjs/testing';
import { UserPermisosService } from './user-permisos.service';

describe('UserPermisosService', () => {
  let service: UserPermisosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPermisosService],
    }).compile();

    service = module.get<UserPermisosService>(UserPermisosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
