import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('date')
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column()
  mobileNo: string;
}
