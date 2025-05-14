import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity';

@Entity('historiales')
export class Historiale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float', { nullable: true })
  peso: number;

  @Column({ type: 'text', nullable: true })
  anamnesis: string;

  @Column({ nullable: true })
  tr: string;

  @Column({ nullable: true })
  fc: string;

  @Column({ nullable: true })
  fr: string;

  @Column({ nullable: true })
  tllc: string;

  @Column({ nullable: true })
  thc: string;

  @Column({ nullable: true })
  apetito: string;

  @Column({ nullable: true })
  pulso: string;

  @Column({ nullable: true })
  cf: string;

  @Column({ nullable: true })
  parvo: string;

  @Column({ nullable: true })
  hexa: string;

  @Column({ nullable: true })
  octa: string;

  @Column({ nullable: true })
  rabica: string;

  @Column({ nullable: true })
  triple: string;

  @Column({ nullable: true })
  moucosidada: string;

  @Column({ nullable: true })
  esterelizado: string;

  @Column({ nullable: true })
  desparacitacion: string;

  @Column({ nullable: true })
  rayox: string;

  @Column({ nullable: true })
  laboratoti: string;

  @Column({ nullable: true })
  ecografia: string;

  @Column({ type: 'text', nullable: true })
  diagnostico: string;

  @Column({ type: 'text', nullable: true })
  pronostico: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Mascota, (mascota) => mascota.historiales)
  mascota: Mascota;
}
