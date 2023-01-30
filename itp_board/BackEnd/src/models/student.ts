import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class Student {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column('varchar')
  name: string | undefined

  @Column('varchar')
  address: string | undefined

  @Column('date')
  dateOfBirth: Date | undefined

  @Column('varchar')
  gender: string | undefined

  @Column('varchar')
  mobileNo: string | undefined
}

export { Student }


