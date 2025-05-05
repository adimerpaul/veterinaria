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

@Entity('desparacitaciones')
export class Desparacitacione {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  fecha: string;
  @Column({ nullable: true })
  peso: string;
  @Column({ nullable: true })
  medicamentos: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @ManyToOne(() => User, (user) => user.desparacitaciones)
  user: User;
  @ManyToOne(() => Mascota, (mascota) => mascota.desparacitaciones)
  mascota: Mascota;
}
