import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Student {
  @PrimaryColumn()
  ID: string;

  @Column()
  Name: string;

  @Column()
  Gender: string;

  @Column()
  Address: string;

  @Column()
  Number: string;

  @Column()
  Birthday: string;

  @Column()
  Age: string;
}
