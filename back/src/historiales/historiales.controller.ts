import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HistorialesService } from './historiales.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('historiales')
export class HistorialesController {
  constructor(private readonly historialesService: HistorialesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
      @Body() body,
      @Req() req
  ) {
    const user = req.user
    body.user = {id:user.userId}
    return this.historialesService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.historialesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialesService.remove(+id);
  }
}
