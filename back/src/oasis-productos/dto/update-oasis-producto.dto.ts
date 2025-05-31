import { PartialType } from '@nestjs/mapped-types';
import { CreateOasisProductoDto } from './create-oasis-producto.dto';

export class UpdateOasisProductoDto extends PartialType(CreateOasisProductoDto) {}
