import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:false})
    name: string

    @Column({nullable:false})
    gender: string

    @Column({nullable:false})
    address: string

    @Column({nullable:false})
    mobileNo: string

    @Column({nullable:false})
    dateOfBirth: Date

    @Column({nullable:false})
    age: number
}
