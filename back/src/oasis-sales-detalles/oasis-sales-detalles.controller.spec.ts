import { Test, TestingModule } from '@nestjs/testing';
import { OasisSalesDetallesController } from './oasis-sales-detalles.controller';
import { OasisSalesDetallesService } from './oasis-sales-detalles.service';

describe('OasisSalesDetallesController', () => {
  let controller: OasisSalesDetallesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OasisSalesDetallesController],
      providers: [OasisSalesDetallesService],
    }).compile();

    controller = module.get<OasisSalesDetallesController>(OasisSalesDetallesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
