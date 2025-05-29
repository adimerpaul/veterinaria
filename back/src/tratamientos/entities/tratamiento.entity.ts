// import {Entity} from "typeorm";

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
import { User } from '../../users/entities/user.entity';
import { Historiale } from '../../historiales/entities/historiale.entity';
import { TratamientoMedicamento } from '../../tratamiento-medicamentos/entities/tratamiento-medicamento.entity';

@Entity({ name: 'tratamientos' })
export class Tratamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  observaciones: string;

  @Column({ nullable: true })
  comentario: string;

  @Column({ nullable: true })
  fecha: Date;

  @Column({ nullable: true })
  costo: number;

  @ManyToOne(() => User, (user) => user.tratamientos)
  user: User;

  @ManyToOne(() => Historiale, (historiale) => historiale.tratamientos)
  historiale: Historiale;

  @OneToMany(() => TratamientoMedicamento, (tm) => tm.tratamiento, {
    cascade: true,
    eager: true,
  })
  tratamientoMedicamentos: TratamientoMedicamento[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
