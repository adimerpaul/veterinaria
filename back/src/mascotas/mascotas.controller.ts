import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as sharp from 'sharp';
import * as fs from 'node:fs';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads', // Carpeta donde se guardarán las imágenes
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
        .resize(500) // Cambia el tamaño (puedes ajustar este valor)
        .jpeg({ quality: 70 }) // Reduce la calidad al 70% (ajústalo según necesidad)
        .toFile(compressedPath);

      // Elimina la imagen original para ahorrar espacio
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error('Error al eliminar archivo:', err);
        } else {
          console.log('Archivo eliminado correctamente');
        }
      });

      body.photo = compressedFilename;
    } else {
      body.photo = 'defaultPet.jpg';
    }

    return this.mascotasService.create(body);
  }
  @Post('historial')
  async createHistorial(@Body() body) {
    return this.mascotasService.historial(body);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '',
  ) {
    return this.mascotasService.findAll(Number(page), Number(limit), filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mascotasService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
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
  async update(@Param('id') id: number, @Body() body, @UploadedFile() file) {
    // console.log(file);
    if (file) {
      const compressedFilename = `compressed-${file.filename}`;
      const compressedPath = `./uploads/${compressedFilename}`;

      await sharp(file.path)
        .resize(500) // Cambia el tamaño (puedes ajustar este valor)
        .jpeg({ quality: 70 }) // Reduce la calidad al 70% (ajústalo según necesidad)
        .toFile(compressedPath);

      // Elimina la imagen original para ahorrar espacio
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error('Error al eliminar archivo:', err);
        } else {
          console.log('Archivo eliminado correctamente');
        }
      });
      body.photo = compressedFilename;
    } else {
      delete body.photo;
    }
    return this.mascotasService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mascotasService.remove(+id);
  }
}
