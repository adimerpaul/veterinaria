import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  @Expose() // Agregar para asegurar que se incluya en la transformación
  id: number;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  role: string;

  @Column()
  @Expose()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  @Expose()
  get color(): string {
    const roleColors = {
      Administrador: 'red',
      Admin: 'red', // Agregar esta línea para coincidir con los datos
      Vendedor: 'green',
      Usuario: 'blue',
    };
    return roleColors[this.role] || 'gray'; // Color por defecto si el rol no está en la lista
  }
}
