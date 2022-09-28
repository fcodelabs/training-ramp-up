import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

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
  MobileNo: string;

  @Column({ type: "date", nullable: true })
  DOB: string;

  @Column()
  Age: number;
}
