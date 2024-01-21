import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  gender: string

  @Column()
  address: string

  @Column()
  mobile: string

  @Column()
  date: Date

  @Column()
  age: number
}
