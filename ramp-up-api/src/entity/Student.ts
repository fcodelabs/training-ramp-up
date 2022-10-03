import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column({ type: "bigint" })
  number: number;

  @Column()
  birthday: string;

  @Column()
  age: string;
}
