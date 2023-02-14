import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleEnumType {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role?: RoleEnumType;
}
