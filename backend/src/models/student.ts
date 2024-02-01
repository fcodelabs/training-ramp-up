import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "student" })
export class Student extends BaseEntity {
  @PrimaryColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  gender!: string;

  @Column({ type: "varchar" })
  address!: string;

  @Column({ type: "varchar" })
  mobile!: string;

  @Column({ type: "date" })
  dob!: string;

  @Column({ type: "int" })
  age!: number;
}
