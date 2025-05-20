import { Test, TestingModule } from '@nestjs/testing';
import { TratamientoMedicamentosService } from './tratamiento-medicamentos.service';

describe('TratamientoMedicamentosService', () => {
  let service: TratamientoMedicamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TratamientoMedicamentosService],
    }).compile();

    service = module.get<TratamientoMedicamentosService>(TratamientoMedicamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
