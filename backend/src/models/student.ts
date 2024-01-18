import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from "typeorm";

@Entity("student")
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
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
  dob: Date;
}
