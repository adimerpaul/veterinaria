import { Test, TestingModule } from '@nestjs/testing';
import { TratamientoMedicamentosController } from './tratamiento-medicamentos.controller';
import { TratamientoMedicamentosService } from './tratamiento-medicamentos.service';

describe('TratamientoMedicamentosController', () => {
  let controller: TratamientoMedicamentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TratamientoMedicamentosController],
      providers: [TratamientoMedicamentosService],
    }).compile();

    controller = module.get<TratamientoMedicamentosController>(TratamientoMedicamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
