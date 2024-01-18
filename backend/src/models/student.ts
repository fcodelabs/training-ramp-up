import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity('student')
export class student extends BaseEntity {
  @PrimaryColumn({
    unique: true
  })
  id!: number;

  @Column()
  name!: string;

  @Column()
  gender!: string;

  @Column()
  address!: string;

  @Column()
  mobileno!: string;

  @Column({
    type: 'date'
  })
  dateofbirth!: string;

  @Column()
  age!: number;
}
