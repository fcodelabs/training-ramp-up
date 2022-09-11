import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column()
  Gender: string;

  @Column()
  Address: string;

  @Column()
  MobileNo: string;

  @Column()
  Birth: string;

  @Column()
  Age: string;
}
