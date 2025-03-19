import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body, @Req() req) {
    return this.salesService.create(body, req.user);
  }

  @Post('imprimir')
  imprimir(@Body() body) {
    return this.salesService.imprimir(body);
  }

  @Get()
  findAll(
    @Query('fechaInicio') fechaInicio: string = '',
    @Query('fechaFin') fechaFin: string = '',
    @Query('user_id') user_id: string = '',
  ) {
    return this.salesService.findAll(fechaInicio, fechaFin, user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }
  // proxy.$axios.put(`/ventas/${id}/anular`).then(() => {
  @Put(':id/anular')
  anular(@Param('id') id: string) {
    return this.salesService.anular(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
