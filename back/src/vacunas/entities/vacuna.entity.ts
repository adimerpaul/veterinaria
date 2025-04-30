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

@Entity('vacunas')
export class Vacuna {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  fechaVacuna: string;
  @Column({ nullable: true })
  fechaProximaVacuna: string;
  @Column({ nullable: true })
  nombreVacuna: string;
  @Column({ nullable: true })
  dosis: string;
  @Column({ nullable: true })
  observaciones: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @ManyToOne(() => User, (user) => user.vacunas)
  user: User;
  @ManyToOne(() => Mascota, (mascota) => mascota.vacunas)
  mascota: Mascota;
}
