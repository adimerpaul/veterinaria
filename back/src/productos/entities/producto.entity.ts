import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('productos')
// @Unique(['nombre'])
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  codigo: string;
  @Column({ nullable: true })
  nombre: string;
  @Column({ nullable: true })
  presentacion: string;
  @Column({ nullable: true })
  contenido: string;
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  precioCompra: number;
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  precioVenta: number;
  @Column({ default: 1 })
  stock: number;
  @Column({ default: true })
  activo: boolean;
  @CreateDateColumn()
  @Exclude()
  createdAt: Date;
  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}
