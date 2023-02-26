import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  gender!: string;

  @Column()
  address!: string;

  @Column()
  mobile!: string;

  @Column()
  dob!: Date;

  @Column()
  age!: number;
}
