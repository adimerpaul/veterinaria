import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity';
import { User } from '../../users/entities/user.entity';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  nombre: string;
  @Column({ nullable: true, type: 'text' })
  html: string;
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @ManyToOne(() => Mascota, (mascota) => mascota.documentos)
  mascota: Mascota;
  @ManyToOne(() => User, (user) => user.documentos)
  user: User;
}
