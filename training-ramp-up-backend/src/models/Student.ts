import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    gender!: string

    @Column()
    address!: string

    @Column()
    mobileNo!: string

    @Column()
    dateOfBirth!: Date

    @Column()
    age!: number
}
