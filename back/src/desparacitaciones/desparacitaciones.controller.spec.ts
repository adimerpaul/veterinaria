import { Test, TestingModule } from '@nestjs/testing';
import { DesparacitacionesController } from './desparacitaciones.controller';
import { DesparacitacionesService } from './desparacitaciones.service';

describe('DesparacitacionesController', () => {
  let controller: DesparacitacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesparacitacionesController],
      providers: [DesparacitacionesService],
    }).compile();

    controller = module.get<DesparacitacionesController>(DesparacitacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
