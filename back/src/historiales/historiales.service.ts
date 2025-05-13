import { Injectable } from '@nestjs/common';
import { CreateHistorialeDto } from './dto/create-historiale.dto';
import { UpdateHistorialeDto } from './dto/update-historiale.dto';

@Injectable()
export class HistorialesService {
  create(createHistorialeDto: CreateHistorialeDto) {
    return 'This action adds a new historiale';
  }

  findAll() {
    return `This action returns all historiales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historiale`;
  }

  update(id: number, updateHistorialeDto: UpdateHistorialeDto) {
    return `This action updates a #${id} historiale`;
  }

  remove(id: number) {
    return `This action removes a #${id} historiale`;
  }
}
