import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Student {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  mobile: string;

  @Column()
  birthday: Date;

  @Column()
  age: number;
}
