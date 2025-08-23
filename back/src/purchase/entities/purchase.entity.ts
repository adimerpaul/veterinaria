import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import { PurchaseDetail } from '../../purchase-detail/entities/purchase-detail.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: 'Compra' })
  tipo: string;

  @Column({ nullable: true, default: 'Efectivo' })
  pago: string;

  @Column({ nullable: true, default: '' })
  comentario: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({ nullable: true })
  proveedor: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ default: false })
  anulado: boolean;

  @CreateDateColumn() @Exclude() createdAt: Date;
  @UpdateDateColumn() @Exclude() updatedAt: Date;
  @DeleteDateColumn() @Exclude() deletedAt: Date;

  @ManyToOne(() => User, (user) => user.purchases, { nullable: true })
  user: User;

  @OneToMany(() => PurchaseDetail, (detail) => detail.purchase, {
    cascade: true,
  })
  details: PurchaseDetail[];
}
