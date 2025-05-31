import { PartialType } from '@nestjs/mapped-types';
import { CreateOasisSaleDto } from './create-oasis-sale.dto';

export class UpdateOasisSaleDto extends PartialType(CreateOasisSaleDto) {}
