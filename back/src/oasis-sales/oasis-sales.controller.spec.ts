import { Test, TestingModule } from '@nestjs/testing';
import { OasisSalesController } from './oasis-sales.controller';
import { OasisSalesService } from './oasis-sales.service';

describe('OasisSalesController', () => {
  let controller: OasisSalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OasisSalesController],
      providers: [OasisSalesService],
    }).compile();

    controller = module.get<OasisSalesController>(OasisSalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
