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

@Entity({ name: 'fotos' })
export class Foto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  fecha: Date;
  @Column({ nullable: true })
  observaciones: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @ManyToOne(() => User, (user) => user.fotos)
  user: User;
  @ManyToOne(() => Mascota, (mascota) => mascota.fotos)
  mascota: Mascota;
}
