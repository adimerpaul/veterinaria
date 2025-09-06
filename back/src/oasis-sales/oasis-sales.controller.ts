import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { OasisSalesService } from './oasis-sales.service';
import { CreateOasisSaleDto } from './dto/create-oasis-sale.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('oasis-sales')
export class OasisSalesController {
  constructor(private readonly service: OasisSalesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreateOasisSaleDto, @Req() req) {
    return this.service.create({
      ...body,
      userId: req.user.userId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
    @Query('user_id') userId?: string,   // viene como string del front
  ) {
    return this.service.findAll({
      fechaInicio,
      fechaFin,
      userId: userId && userId !== '' ? Number(userId) : undefined,
    });
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
  // anular
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/anular')
  anular(@Param('id') id: string, @Req() req) {
    return this.service.anular(+id, req.user.userId);
  }
}
