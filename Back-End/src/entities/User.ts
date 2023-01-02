import { Entity, Column, Index, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export enum RoleEnumType {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

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
  role!: RoleEnumType;

  // @OneToOne(() => UserToken)
  // @JoinColumn()
  // userToken: UserToken;
}
