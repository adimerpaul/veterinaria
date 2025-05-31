import { Test, TestingModule } from '@nestjs/testing';
import { OasisProductosController } from './oasis-productos.controller';
import { OasisProductosService } from './oasis-productos.service';

describe('OasisProductosController', () => {
  let controller: OasisProductosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OasisProductosController],
      providers: [OasisProductosService],
    }).compile();

    controller = module.get<OasisProductosController>(OasisProductosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
