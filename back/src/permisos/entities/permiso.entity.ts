import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserPermiso } from '../../user-permisos/entities/user-permiso.entity';

@Entity({ name: 'permisos' })
@Unique(['nombre'])
export class Permiso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ default: false })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => UserPermiso, (userPermiso) => userPermiso.permiso)
  userPermisos: UserPermiso[];
}
