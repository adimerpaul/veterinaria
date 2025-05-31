import { Test, TestingModule } from '@nestjs/testing';
import { OasisProductosService } from './oasis-productos.service';

describe('OasisProductosService', () => {
  let service: OasisProductosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OasisProductosService],
    }).compile();

    service = module.get<OasisProductosService>(OasisProductosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
