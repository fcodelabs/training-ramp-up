import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  // CreateDateColumn,
} from "typeorm";

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  StudentName: string;

  @Column()
  Gender: string;

  @Column()
  Address: string;

  @Column()
  MobileNo: number;

  @Column()
  // @CreateDateColumn()
  DOB: string;
}
