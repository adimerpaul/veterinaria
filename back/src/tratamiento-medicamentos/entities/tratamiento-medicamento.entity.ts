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
import { Tratamiento } from '../../tratamientos/entities/tratamiento.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity({ name: 'tratamiento_medicamentos' })
export class TratamientoMedicamento {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  medicamento: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ nullable: true })
  fecha: Date;

  @ManyToOne(
    () => Tratamiento,
    (tratamiento) => tratamiento.tratamientoMedicamentos,
  )
  tratamiento: Tratamiento;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Producto, (producto) => producto.tratamientoMedicamentos)
  producto: Producto;
}
