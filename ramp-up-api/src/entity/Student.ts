import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Name: string;

  @Column()
  Gender: string;

  @Column()
  Address: string;

  @Column()
  MobileNo: string;

  @Column({ type: 'date', nullable: true })
  Birth: string;

  @Column()
  Age: string;
}
