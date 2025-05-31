import { Test, TestingModule } from '@nestjs/testing';
import { OasisSalesService } from './oasis-sales.service';

describe('OasisSalesService', () => {
  let service: OasisSalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OasisSalesService],
    }).compile();

    service = module.get<OasisSalesService>(OasisSalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
