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
@Entity({ name: 'users' })
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  role: string;
  @Column()
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
}
