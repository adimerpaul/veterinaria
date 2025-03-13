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

@Entity('mascotas')
// @Unique(['nombre'])
export class Mascota {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  nombre: string;
  @Column({ nullable: true })
  especie: string;
  @Column({ nullable: true })
  raza: string;
  @Column({ nullable: true })
  sexo: string;
  @Column({ nullable: true })
  fecha_nac: string;
  @Column({ nullable: true })
  senas_particulares: string;
  @Column({ nullable: true, default: 'defaultPet.jpg' })
  photo: string;
  @Column({ nullable: true })
  color: string;
  @Column({ nullable: true })
  propietario_nombre: string;
  @Column({ nullable: true })
  propietario_direccion: string;
  @Column({ nullable: true })
  propietario_telefono: string;
  @Column({ nullable: true })
  propietario_ciudad: string;
  @Column({ nullable: true })
  propietario_celular: string;
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
