import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
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
  Birth: Date;

  @Column()
  Age: string;
}
