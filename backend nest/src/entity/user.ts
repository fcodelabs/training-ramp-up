/* eslint-disable prettier/prettier */

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum Role {
  ADMIN = 'admin',
  GUEST = 'guest',
  EDITOR = 'editor',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column()
  @Index({
    unique: true,
  })
  Email: string;

  @Column()
  Password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  Role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('text', { default: '' })
  RefreshToken: string;

  @Column('text', { default: 'local' })
  Provider: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
  }
}
