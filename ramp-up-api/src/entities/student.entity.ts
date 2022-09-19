// import { type } from "os";
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

//enum consists of constant strings as shown as below
enum Gender{
  Female = "Female",
  Male = "Male",
  Other = "Other"
}

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  StudentName: string;

  @Column(
    {type: 'enum', enum:Gender}
)
  Gender: Gender;

  @Column()
  Address: string;

  @Column()
  MobileNo: string;

  @Column({ type: "date", nullable: true })
  DOB: string;

  @Column()
  Age: number;
}
