import { Exclude, Expose } from 'class-transformer';
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
import { Sale } from '../../sales/entities/sale.entity';
import { Documento } from '../../documentos/entities/documento.entity';
import { UserPermiso } from '../../user-permisos/entities/user-permiso.entity';
import { Vacuna } from '../../vacunas/entities/vacuna.entity';
import { Desparacitacione } from '../../desparacitaciones/entities/desparacitacione.entity';
import { Historiale } from '../../historiales/entities/historiale.entity';
import { Tratamiento } from '../../tratamientos/entities/tratamiento.entity';

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

  @Column({ nullable: true, default: 'Oasis' })
  @Expose()
  agencia: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  @OneToMany(() => Documento, (documento) => documento.user)
  documentos: Documento[];

  @OneToMany(() => UserPermiso, (userPermiso) => userPermiso.user)
  userPermisos: UserPermiso[];

  @OneToMany(() => Vacuna, (vacuna) => vacuna.user)
  vacunas: Vacuna[];

  // historiales
  @OneToMany(() => Historiale, (historial) => historial.user)
  historiales: Historiale[];

  @OneToMany(
    () => Desparacitacione,
    (desparacitacione) => desparacitacione.user,
  )
  desparacitaciones: Desparacitacione[];

  @OneToMany(() => Tratamiento, (tratamiento) => tratamiento.user)
  tratamientos: Tratamiento[];
}
