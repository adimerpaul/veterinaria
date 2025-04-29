import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Permiso } from '../../permisos/entities/permiso.entity';

@Entity({ name: 'user_permisos' })
@Unique(['userId', 'permisoId'])
export class UserPermiso {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  permisoId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @ManyToOne(() => User, (user) => user.userPermisos, { nullable: true })
  user: User;
  @ManyToOne(() => Permiso, (permiso) => permiso.userPermisos, {
    nullable: true,
  })
  permiso: Permiso;
}
