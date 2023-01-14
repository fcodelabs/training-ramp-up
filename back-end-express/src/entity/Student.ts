import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class Student {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @Column()
    gender: string

  @Column()
    address: string

  @Column()
    mobileNo: string

  @Column()
    dob: Date
}
