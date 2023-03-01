import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column({
    default: 'student',
  })
  userRole: string;
}
