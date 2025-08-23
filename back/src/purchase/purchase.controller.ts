import { Controller, Get, Post, Put, Body, Query, Param, Req } from '@nestjs/common';
import { PurchasesService } from './purchase.service';
// import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly service: PurchasesService) {}

  @Post()
  create(@Body() body: any, @Req() req: any) {
    // req.user.userId según tu guard/jwt
    return this.service.create(body, req.user || { userId: 1 });
  }

  @Get()
  findAll(@Query('fechaInicio') fi: string, @Query('fechaFin') ff: string, @Query('user_id') user_id?: string) {
    return this.service.findAll(fi, ff, user_id);
  }

  @Post('imprimir')
  imprimir(@Body() body: any) {
    return this.service.imprimir(body);
  }

  @Put(':id/anular')
  anular(@Param('id') id: string) {
    return this.service.anular(+id);
  }
}
