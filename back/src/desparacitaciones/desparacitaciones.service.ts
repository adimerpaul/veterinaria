import { Injectable } from '@nestjs/common';
import { CreateDesparacitacioneDto } from './dto/create-desparacitacione.dto';
import { UpdateDesparacitacioneDto } from './dto/update-desparacitacione.dto';

@Injectable()
export class DesparacitacionesService {
  create(createDesparacitacioneDto: CreateDesparacitacioneDto) {
    return 'This action adds a new desparacitacione';
  }

  findAll() {
    return `This action returns all desparacitaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} desparacitacione`;
  }

  update(id: number, updateDesparacitacioneDto: UpdateDesparacitacioneDto) {
    return `This action updates a #${id} desparacitacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} desparacitacione`;
  }
}
