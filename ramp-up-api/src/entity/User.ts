import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  UserName: string;

  @Column()
  Password: string;

  @Column()
  Salt: string;

  @Column()
  Token: string;
}
