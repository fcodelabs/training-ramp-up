import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class Student {
  @PrimaryGeneratedColumn()
  index: number | undefined

  @Column({ type: 'varchar', unique: true })
  id: string | undefined

  @Column('varchar')
  name: string | undefined

  @Column('varchar')
  address: string | undefined

  @Column('date')
  dob: Date | undefined
  
  @Column('varchar')
  gender: string | undefined

  @Column('varchar')
  mobileNo: string | undefined
}

export { Student }


