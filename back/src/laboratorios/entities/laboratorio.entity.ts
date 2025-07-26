import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Mascota } from '../../mascotas/entities/mascota.entity';

@Entity('laboratorios')
export class Laboratorio {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  fecha: Date;
  @Column({ nullable: true })
  observaciones: string;
  @Column({ nullable: true })
  src: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @ManyToOne(() => User, (user) => user.laboratorios)
  user: User;
  @ManyToOne(() => Mascota, (mascota) => mascota.laboratorios)
  mascota: Mascota;
}
