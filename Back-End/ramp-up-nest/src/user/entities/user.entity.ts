import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

export enum RoleType {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
