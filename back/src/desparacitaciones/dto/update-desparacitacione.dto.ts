import { PartialType } from '@nestjs/mapped-types';
import { CreateDesparacitacioneDto } from './create-desparacitacione.dto';

export class UpdateDesparacitacioneDto extends PartialType(CreateDesparacitacioneDto) {}
