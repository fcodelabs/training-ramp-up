import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  gender!: string;

  @Column()
  address!: string;

  @Column()
  mobileNumber!: string;

  @Column({ type: 'date' })
  birthday!: string;

  @Column()
  age!: number;
}
