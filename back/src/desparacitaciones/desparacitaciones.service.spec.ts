import { Test, TestingModule } from '@nestjs/testing';
import { DesparacitacionesService } from './desparacitaciones.service';

describe('DesparacitacionesService', () => {
  let service: DesparacitacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesparacitacionesService],
    }).compile();

    service = module.get<DesparacitacionesService>(DesparacitacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
