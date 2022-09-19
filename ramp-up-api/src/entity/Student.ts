import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Name: string;

  @Column()
  Gender: string;

  @Column()
  Address: string;

  @Column({ type: "bigint" })
  Number: number;

  @Column()
  Birthday: string;

  @Column()
  Age: string;
}
