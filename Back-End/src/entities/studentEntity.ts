import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  gender!: string;

  @Column()
  address!: string;

  @Column()
  mobile!: string;

  @Column()
  birthday!: string;
}
