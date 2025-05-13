import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialeDto } from './create-historiale.dto';

export class UpdateHistorialeDto extends PartialType(CreateHistorialeDto) {}
