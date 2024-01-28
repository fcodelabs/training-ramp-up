import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class Student {
  @PrimaryColumn()
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
  dob: Date

  @Column()
  age: number
}
