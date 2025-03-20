import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body, @Req() req: Request) {
    return this.documentosService.create(body, req);
  }

  // @Get()
  // findAll() {
  //   return this.documentosService.findAll();
  // }
  //
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentosService.findOne(+id);
  }
  //
  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.documentosService.update(+id, body);
  }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.documentosService.remove(+id);
  // }
}
