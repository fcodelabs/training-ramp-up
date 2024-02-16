import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name: string | undefined;

  @Column()
  gender: string | undefined;

  @Column()
  mobile: string | undefined;

  @Column()
  dob: Date | undefined;
  
  @Column()
  age: number | undefined;
  
}
