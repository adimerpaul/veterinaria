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
import { Mascota } from '../../mascotas/entities/mascota.entity';
import { User } from '../../users/entities/user.entity';
import { Detail } from '../../details/entities/detail.entity';
import { OasisSalesDetalle } from '../../oasis-sales-detalles/entities/oasis-sales-detalle.entity';

@Entity('oasissales')
export class OasisSale {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, default: 'Venta' })
  tipo: string;
  @Column({ nullable: true, default: '' })
  comentarioDoctor: string;
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date;
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;
  @Column({ nullable: true })
  facturado: boolean;
  @Column({ nullable: true })
  nombre: string;
  @Column({ nullable: true, type: 'text' })
  comentario: string;
  @Column({ nullable: true })
  ci: string;
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  total: number;
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
  @OneToMany(
    () => OasisSalesDetalle,
    (oasisSalesDetalle) => oasisSalesDetalle.oasisSale,
  )
  oasisSalesDetalles: OasisSalesDetalle[];
}
