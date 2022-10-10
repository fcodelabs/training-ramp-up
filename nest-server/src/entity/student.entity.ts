import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  name: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column({
    length: 10,
  })
  mobile_number: string;

  @Column()
  age: number;

  @Column({ type: 'date', nullable: true })
  date: string;
}
