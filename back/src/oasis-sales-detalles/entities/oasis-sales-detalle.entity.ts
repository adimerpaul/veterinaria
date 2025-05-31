import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Mascota } from '../../mascotas/entities/mascota.entity';
import { User } from '../../users/entities/user.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { OasisProducto } from '../../oasis-productos/entities/oasis-producto.entity';
import { OasisSale } from '../../oasis-sales/entities/oasis-sale.entity';

@Entity('details')
export class OasisSalesDetalle {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  fecha: Date;
  @Column({ nullable: true })
  productoName: string;
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  precio: number;
  @Column({ nullable: true })
  cantidad: number;
  @Column({ default: true })
  anulado: boolean;
  @CreateDateColumn()
  @Exclude()
  createdAt: Date;
  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
  // @ManyToOne(() => Mascota, (mascota) => mascota.sales, { nullable: true })
  // mascota: Mascota;
  @ManyToOne(() => User, (user) => user.sales, { nullable: true })
  user: User;
  @ManyToOne(() => OasisSale, (oasisSale) => oasisSale.oasisSalesDetalles, {
    nullable: true,
  })
  oasisSale: OasisSale;
  @ManyToOne(() => OasisProducto, (oasisProducto) => oasisProducto.details, {
    nullable: true,
  })
  oasisProducto: OasisProducto;
}
