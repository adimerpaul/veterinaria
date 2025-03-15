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

@Entity('details')
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  fecha: Date;
  @Column({ nullable: true })
  productoName: string;
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;
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
  @ManyToOne(() => Mascota, (mascota) => mascota.sales, { nullable: true })
  mascota: Mascota;
  @ManyToOne(() => User, (user) => user.sales, { nullable: true })
  user: User;
  @ManyToOne(() => Sale, (sale) => sale.details, { nullable: true })
  sale: Sale;
  //   producto: Producto;
  @ManyToOne(() => Producto, (producto) => producto.details, { nullable: true })
  producto: Producto;
}
