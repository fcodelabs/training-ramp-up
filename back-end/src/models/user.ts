import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 10 })
  role!: string;

  @Column({ type: 'varchar', default: '' })
  password!: string;

  @Column({ type: 'bool', default: false })
  active!: boolean;

  @Column({ type: 'varchar', default: false })
  token!: string;
}
