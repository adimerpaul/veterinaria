import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FotosService } from './fotos.service';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as sharp from 'sharp';
import * as fs from 'node:fs';
@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(@Body() body, @UploadedFile() file) {
    if (file) {
      const compressedFilename = `compressed-${file.filename}`;
      const compressedPath = `./uploads/${compressedFilename}`;

      await sharp(file.path)
        .resize(350)
        .jpeg({ quality: 70 })
        .toFile(compressedPath);

      fs.unlink(file.path, (err) => {
        if (err) console.error('Error eliminando archivo original:', err);
      });

      body.imagen = `${compressedFilename}`;
    }
    return this.fotosService.create(body);
  }

  @Get()
  findAll() {
    return this.fotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFotoDto: UpdateFotoDto) {
    return this.fotosService.update(+id, updateFotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fotosService.remove(+id);
  }
}
