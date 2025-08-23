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
import { User } from '../../users/entities/user.entity';
import { Purchase } from '../../purchase/entities/purchase.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('purchase_details')
export class PurchaseDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ nullable: true })
  productoName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precio: number; // precio de compra

  @Column({ nullable: true })
  cantidad: number;

  @Column({ default: false })
  anulado: boolean;

  @CreateDateColumn() @Exclude() createdAt: Date;
  @UpdateDateColumn() @Exclude() updatedAt: Date;
  @DeleteDateColumn() @Exclude() deletedAt: Date;

  @ManyToOne(() => User, (user) => user.purchaseDetails, { nullable: true })
  user: User;

  @ManyToOne(() => Purchase, (purchase) => purchase.details, { nullable: true })
  purchase: Purchase;

  @ManyToOne(() => Producto, (producto) => producto.details, { nullable: true })
  producto: Producto;
}
