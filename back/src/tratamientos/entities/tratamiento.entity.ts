// import {Entity} from "typeorm";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Historiale } from '../../historiales/entities/historiale.entity';

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
}
