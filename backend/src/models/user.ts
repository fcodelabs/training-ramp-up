import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'Admin',
  OBSERVER = 'Observer'
}

@Entity('user')
export class Users extends BaseEntity {
  @PrimaryColumn({
    unique: true
  })
  email!: string;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.OBSERVER
  })
  role!: UserRole;

  @Column()
  password!: string;
}
