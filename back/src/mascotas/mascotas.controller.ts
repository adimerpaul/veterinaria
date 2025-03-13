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
  create(@Body() body, @UploadedFile() file) {
    if (file) {
      body.photo = file.filename;
    } else {
      body.photo = 'defaultPet.jpg';
    }
    return this.mascotasService.create(body);
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
  update(@Param('id') id: number, @Body() body, @UploadedFile() file) {
    console.log(file);
    if (file) {
      body.photo = `${file.filename}`;
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
