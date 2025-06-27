import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { Between, DataSource, Repository } from 'typeorm';
import { Detail } from '../details/entities/detail.entity';
import { Mascota } from '../mascotas/entities/mascota.entity';
import { User } from '../users/entities/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import any = jasmine.any;

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
    private dataSource: DataSource,
  ) {}
  async imprimir(body: any) {
    try {
      // console.log('Imprimir:', body);
      // user_id: 1,
      //     fechaInicio: '2025-03-19',
      //     fechaFin: '2025-03-19',
      //     reporte: 'CAJA'
      const fechaInicioDate = new Date(body.fechaInicio + ' 00:00:00');
      const fechaFinDate = new Date(body.fechaFin + ' 23:59:59');
      const whereCondition = {
        fecha: Between(fechaInicioDate, fechaFinDate),
        anulado: false,
      };
      if (body.user_id) {
        whereCondition['user'] = { id: body.user_id };
      }

      const reporte = body.reporte;
      if (reporte === 'CAJA') {
        const sales = await this.salesRepository.find({
          where: whereCondition,
          relations: ['user', 'mascota', 'details'],
          order: {
            fecha: 'DESC',
          },
        });
        // console.log('Ventas encontradas:', sales);
        return sales;
      }
      if (reporte === 'PRODUCTOS') {
        const details = await this.detailRepository.find({
          where: whereCondition,
          relations: ['user', 'mascota', 'sale', 'producto'],
          order: {
            fecha: 'DESC',
          },
        });
        // console.log('Detalles encontrados:', details);
        return details;
      }
    } catch (error) {
      return { error: error.message };
    }
  }
  async anular(id: number) {
    try {
      // Obtener la venta desde la base de datos
      const sale = await this.salesRepository.findOne({
        where: { id: id },
        relations: ['details.producto'],
      });

      if (!sale) {
        throw new Error('Venta no encontrada');
      }

      // Actualizar la venta
      sale.anulado = true;
      // sale.fechaAnulacion = new Date();

      // Actualizar los detalles de la venta
      for (const detail of sale.details) {
        detail.anulado = true;
        await this.detailRepository.save(detail);
        console.log(detail);
        const producto = await this.productoRepository.findOne({
          where: { id: detail.producto.id },
        });
        if (producto) {
          producto.stock += detail.cantidad; // Revertir el stock
          await this.productoRepository.save(producto);
        }
      }

      // Guardar la venta en la base de datos
      await this.salesRepository.save(sale);

      return { message: 'Venta anulada exitosamente', sale: sale };
    } catch (error) {
      throw Error(`Error al anular la venta: ${error.message}`);
    }
  }
  async create(body: any, user: any) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Validar mascota
      const mascota = await queryRunner.manager.findOne(Mascota, {
        where: { id: body.mascota.id },
      });
      if (!mascota) throw new Error('Mascota no encontrada');

      // 2. Validar usuario
      const userEntity = await queryRunner.manager.findOne(User, {
        where: { id: user.userId },
      });
      if (!userEntity) throw new Error('Usuario no encontrado');

      // 3. Validar total
      const total = parseFloat(body.total);
      if (isNaN(total)) throw new Error('Total inválido');

      // 4. Crear la venta
      const sale = queryRunner.manager.create(Sale, {
        tipo: 'Venta',
        fecha: new Date(),
        fechaCreacion: new Date(),
        facturado: false,
        nombre: mascota.propietario_nombre,
        total,
        anulado: false,
        comentarioDoctor: body.comentarioDoctor,
        pago: body.pago,
        mascota,
        user: userEntity,
      });

      const savedSale = await queryRunner.manager.save(Sale, sale);

      // 5. Insertar detalles de venta
      const details: Detail[] = [];
      for (const product of body.productos) {
        // Validar producto
        const producto = await queryRunner.manager.findOne(Producto, {
          where: { id: product.id },
        });
        if (!producto)
          throw new Error(`Producto con ID ${product.id} no encontrado`);

        // Validar precio y cantidad
        const precio = parseFloat(product.precioVenta);
        const cantidad = parseInt(product.cantidadVenta);
        if (isNaN(precio) || isNaN(cantidad)) {
          throw new Error(
            `Precio o cantidad inválida para producto ${product.id}`,
          );
        }
        const detail = queryRunner.manager.create(Detail, {
          fecha: new Date(),
          productoName: producto.nombre,
          cantidad,
          precio,
          subtotal: precio * cantidad,
          anulado: false,
          mascota,
          user: userEntity,
          sale: savedSale,
          producto,
        });

        await queryRunner.manager.save(Detail, detail);
        details.push(detail);
        // Actualizar stock del producto
        producto.stock -= cantidad;
        await queryRunner.manager.save(Producto, producto);
      }
      savedSale.details = details;

      // 6. Confirmar la transacción
      await queryRunner.commitTransaction();

      return {
        message: 'Venta registrada exitosamente',
        sale: savedSale,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      // Lanzar error como 500 para que Nest lo capture correctamente
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(fechaInicio: string, fechaFin: string, user_id: string) {
    const fechaInicioDate = new Date(fechaInicio + ' 00:00:00');
    const fechaFinDate = new Date(fechaFin + ' 23:59:59');

    const whereCondition = {
      fecha: Between(fechaInicioDate, fechaFinDate),
    };

    if (user_id) {
      whereCondition['user'] = { id: user_id };
    }

    const sales = await this.salesRepository.find({
      where: whereCondition,
      relations: ['user', 'mascota', 'details.producto'],
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
