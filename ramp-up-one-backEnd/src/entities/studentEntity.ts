import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    name!: string;

  @Column()
    gender!: string;

  @Column()
    address!: string;

  @Column()
    mobileNo!: string;

  @Column({ type: 'date' })
    birth!: Date;

  @Column()
    age!: number;
}
