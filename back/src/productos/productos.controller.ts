import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as sharp from 'sharp';
import * as fs from 'node:fs';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '',
    @Query('tipo') tipo: string = '',
  ) {
    return this.productosService.findAll(
      Number(page),
      Number(limit),
      filter,
      tipo,
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
  }

  @Post(':id/imagen')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/imagenes', // Carpeta donde se guardarán las imágenes
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async uploadImagen(
    @Param('id') id: number,
    @UploadedFile() file,
    @Body() body,
  ) {
    console.log(file.path);
    if (file) {
      const compressedFilename = `compressed-${file.filename}`;
      const compressedPath = `./uploads/imagenes/${compressedFilename}`;

      await sharp(file.path)
        .resize(350) // Cambia el tamaño (puedes ajustar este valor)
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

      // body.photo = compressedFilename;
      body.photo = 'imagenes\\' + compressedFilename;
    } else {
      body.photo = 'imagenes\\default.png';
    }
    return this.productosService.cambiarImagen(id, body.photo);
  }
  @Get('all')
  async findAllProductos() {
    return this.productosService.findAllProductos();
  }
}
