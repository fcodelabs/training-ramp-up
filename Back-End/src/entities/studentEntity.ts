import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  mobile: string;

  @Column({ type: 'date' })
  birthday: string;
}
