import { Injectable } from '@nestjs/common';
import { Mascota } from './entities/mascota.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { Detail } from '../details/entities/detail.entity';
import { Sale } from '../sales/entities/sale.entity';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private mascotasRepository: Repository<Mascota>,
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    @InjectRepository(Detail)
    private detailsRepository: Repository<Detail>,
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}
  async historial(body) {
    const mascotaId = body.mascotaId;
    //   hostorail de sale
    console.log('mascotaId');
    const historial = await this.salesRepository.find({
      where: { mascota: { id: mascotaId } },
      relations: ['user', 'mascota', 'details'],
      order: { id: 'DESC' },
    });

    if (!historial) {
      return null;
    }
    console.log('historial');

    // // Obtener los detalles filtrados en una sola consulta
    // const detalles = await this.detailsRepository.find({
    //   where: {
    //     sale: In(historial.map((h) => h.id)), // Filtrar por las ventas específicas
    //   },
    //   relations: ['producto'],
    // });
    // console.log('detalles');
    //
    // // Agregar los detalles a cada venta
    // // historial.forEach((venta) => {
    // //   venta['detalles'] = detalles.filter(
    // //     (detalle) => detalle.sale.id === venta.id,
    // //   );
    // // });
    // console.log('historial con detalles');

    return historial;
  }
  async create(body) {
    // console.log(body);
    const mascota = this.mascotasRepository.create(body);
    return await this.mascotasRepository.save(mascota);
  }
  async findAll(page: number = 1, limit: number = 10, filter: string = '') {
    const query = this.mascotasRepository.createQueryBuilder('mascota');
    if (filter) {
      query.where(
        'mascota.nombre LIKE :filter OR mascota.propietario_nombre LIKE :filter',
        { filter: `%${filter}%` },
      );
    }
    query
      .orderBy('mascota.nombre', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);
    const [mascotas, total] = await query.getManyAndCount();
    return {
      data: mascotas,
      total,
      last_page: Math.ceil(total / limit),
      current_page: page,
    };
  }

  async findOne(id: number) {
    const mascota = await this.mascotasRepository.findOne({
      where: { id },
      relations: [
        'sales',
        'sales.user',
        'sales.details',
        'details',
        'documentos',
        'documentos.user',
        'vacunas',
        'vacunas.user',
        'desparacitaciones',
        'desparacitaciones.user',
        'historiales',
      ],
    });

    if (!mascota) {
      return null;
    }

    const tipos = ['Cirugía', 'Laboratorio', 'Peluqueria', 'Tratamiento'];

    // Obtener solo los productos que pertenecen a los tipos deseados
    const productosEspaciales = await this.productosRepository.find({
      where: { tipo: In(tipos) },
    });

    if (productosEspaciales.length === 0) {
      return mascota; // No hay productos especiales, retornamos la mascota como está
    }

    // Obtener los detalles filtrados en una sola consulta
    const productosEspacialesMascotas = await this.detailsRepository.find({
      where: {
        producto: In(productosEspaciales.map((p) => p.id)), // Filtrar por los productos especiales
        mascota: { id }, // Filtrar por la mascota específica
      },
      relations: ['user', 'producto'],
    });

    // Agregar los productos especiales a la mascota
    mascota['productosEspeciales'] = productosEspacialesMascotas;

    return mascota;
  }

  async update(id: number, body) {
    // console.log(body);
    await this.mascotasRepository.update(id, body);
    // console.log(mascota);
    return await this.mascotasRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.mascotasRepository.delete(id);
  }
}
