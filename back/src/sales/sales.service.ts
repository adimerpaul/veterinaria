import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { Between, Repository } from 'typeorm';
import { Detail } from '../details/entities/detail.entity';
import { Mascota } from '../mascotas/entities/mascota.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,

    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,

    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}
  async create(body: any, user: any) {
    try {
      // Obtener la mascota desde la base de datos
      const mascota = await this.mascotaRepository.findOne({
        where: { id: body.mascota.id },
      });

      if (!mascota) {
        throw new Error('Mascota no encontrada');
      }

      // Obtener el usuario desde la base de datos
      const userEntity = await this.userRepository.findOne({
        where: { id: user.userId },
      });

      if (!userEntity) {
        throw new Error('Usuario no encontrado');
      }

      // Crear la venta
      const sale = this.salesRepository.create({
        tipo: 'Venta',
        fecha: new Date(),
        fechaCreacion: new Date(),
        facturado: false,
        nombre: mascota.propietario_nombre,
        total: parseFloat(body.total),
        anulado: false,
        mascota: mascota,
        user: userEntity,
      });

      // Guardar la venta en la base de datos
      const savedSale = await this.salesRepository.save(sale);

      // Insertar los detalles de la venta
      for (const product of body.productos) {
        // Obtener el producto desde la base de datos
        const producto = await this.productoRepository.findOne({
          where: { id: product.id },
        });

        if (!producto) {
          throw new Error(`Producto con ID ${product.id} no encontrado`);
        }

        // Crear el detalle de la venta
        const detail = this.detailRepository.create({
          fecha: new Date(),
          productoName: producto.nombre,
          subtotal: parseFloat(product.precioVenta) * product.cantidadVenta,
          anulado: false,
          mascota: mascota,
          user: userEntity,
          sale: savedSale,
          producto: producto,
        });

        // Guardar el detalle en la base de datos
        await this.detailRepository.save(detail);
      }

      return { message: 'Venta registrada exitosamente', sale: savedSale };
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll(fechaInicio: string, fechaFin: string) {
    // console.log('Fecha Inicio:', fechaInicio);
    // console.log('Fecha Fin:', fechaFin);

    // Convertir a formato Date UTC para evitar problemas de zona horaria
    const fechaInicioDate = new Date(fechaInicio + ' 00:00:00');
    const fechaFinDate = new Date(fechaFin + ' 23:59:59');

    // console.log('Fecha Inicio Formateada:', fechaInicioDate.toISOString());
    // console.log('Fecha Fin Formateada:', fechaFinDate.toISOString());

    const sales = await this.salesRepository.find({
      where: {
        fecha: Between(fechaInicioDate, fechaFinDate),
      },
      relations: ['user', 'mascota', 'details'],
      order: {
        fecha: 'DESC',
      },
    });

    // console.log('Ventas encontradas:', sales);
    return sales;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
