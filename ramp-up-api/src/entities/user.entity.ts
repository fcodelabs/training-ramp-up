import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  User: string;

  @Column()
  Password: string;

  @Column()
  Email: string;

  @Column()
  Role: string;
}
