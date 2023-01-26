import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  // @PrimaryColumn()
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
  dob!: Date;

  @Column()
  age: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
