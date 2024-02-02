import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @Column({
    type: 'varchar',
    nullable: true
  })
  tempToken!: string;

  async compareTempToken(enteredToken: string): Promise<boolean> {
    try {
      const bool = await bcrypt.compare(enteredToken, this.tempToken);
      return bool;
    } catch (error) {
      return false;
    }
  }
}
