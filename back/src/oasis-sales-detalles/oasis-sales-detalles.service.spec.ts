import { Test, TestingModule } from '@nestjs/testing';
import { OasisSalesDetallesService } from './oasis-sales-detalles.service';

describe('OasisSalesDetallesService', () => {
  let service: OasisSalesDetallesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OasisSalesDetallesService],
    }).compile();

    service = module.get<OasisSalesDetallesService>(OasisSalesDetallesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
