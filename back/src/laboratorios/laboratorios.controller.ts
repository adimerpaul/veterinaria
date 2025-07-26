import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LaboratoriosService } from './laboratorios.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('laboratorios')
export class LaboratoriosController {
  constructor(private readonly laboratoriosService: LaboratoriosService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('archivo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(@Body() body, @UploadedFile() file) {
    if (file) {
      body.src = file.filename;
    }
    return this.laboratoriosService.create(body);
  }

  @Get()
  findAll() {
    return this.laboratoriosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.laboratoriosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.laboratoriosService.remove(+id);
  }
}
