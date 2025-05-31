import { PartialType } from '@nestjs/mapped-types';
import { CreateOasisSalesDetalleDto } from './create-oasis-sales-detalle.dto';

export class UpdateOasisSalesDetalleDto extends PartialType(CreateOasisSalesDetalleDto) {}
