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
import { Exclude } from 'class-transformer';
import { Sale } from '../../sales/entities/sale.entity';
import { Detail } from '../../details/entities/detail.entity';
import { Documento } from '../../documentos/entities/documento.entity';
import { Vacuna } from '../../vacunas/entities/vacuna.entity';
import { Desparacitacione } from '../../desparacitaciones/entities/desparacitacione.entity';
import { Historiale } from '../../historiales/entities/historiale.entity';
import { Foto } from '../../fotos/entities/foto.entity';
import { Laboratorio } from '../../laboratorios/entities/laboratorio.entity';

@Entity('mascotas')
// @Unique(['nombre'])
export class Mascota {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  nombre: string;
  @Column({ nullable: true })
  apellido: string;
  @Column({ nullable: true })
  especie: string;
  @Column({ nullable: true })
  raza: string;
  @Column({ nullable: true })
  sexo: string;
  @Column({ nullable: true })
  fecha_nac: string;
  @Column({ nullable: true })
  edad: string;
  @Column({ nullable: true })
  senas_particulares: string;
  @Column({ nullable: true, default: 'defaultPet.jpg' })
  photo: string;
  @Column({ nullable: true })
  color: string;
  @Column({ nullable: true })
  propietario_nombre: string;
  @Column({ nullable: true })
  propietario_ci: string;
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
  @OneToMany(() => Sale, (sale) => sale.mascota)
  sales: Sale[];
  @OneToMany(() => Detail, (detail) => detail.mascota)
  details: Detail[];
  @OneToMany(() => Documento, (documento) => documento.mascota)
  documentos: Documento[];
  @OneToMany(() => Vacuna, (vacuna) => vacuna.mascota)
  vacunas: Vacuna[];
  @OneToMany(
    () => Desparacitacione,
    (desparacitacione) => desparacitacione.mascota,
  )
  desparacitaciones: Desparacitacione[];
  // historelaes
  @OneToMany(() => Historiale, (historiale) => historiale.mascota)
  historiales: Historiale[];
  @OneToMany(() => Foto, (foto) => foto.mascota)
  fotos: Foto[];

  @OneToMany(() => Laboratorio, (laboratorio) => laboratorio.mascota)
  laboratorios: Laboratorio[];
}
