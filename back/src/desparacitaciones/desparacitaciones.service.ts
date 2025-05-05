import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { Desparacitacione } from './entities/desparacitacione.entity';

@Injectable()
export class DesparacitacionesService {
  constructor(
    @InjectRepository(Desparacitacione)
    private readonly desparasitacionRepository: Repository<Desparacitacione>,
  ) {}

  async create(body, req) {
    body.fecha = moment().format('YYYY-MM-DD');
    body.mascota = { id: body.mascotaId };
    body.user = { id: req.user.userId };

    const desparasitacion = this.desparasitacionRepository.create(body);
    return await this.desparasitacionRepository.save(desparasitacion);
  }

  async remove(id: number) {
    const desparasitacion = await this.desparasitacionRepository.findOne({
      where: { id },
    });
    if (!desparasitacion) {
      throw new Error('Desparasitación no encontrada');
    }
    return await this.desparasitacionRepository.softDelete(id);
  }
}
