import { Entity, Column, PrimaryGeneratedColumn,BaseEntity } from "typeorm"

enum Gender{
    Female="Female",
    Male="Male",
    Other="Other"
}

@Entity("student")
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        type:'enum',
        enum:Gender,
        default:Gender.Male
    })
    gender: Gender

    @Column()
    address: string

    @Column({
        unique:true
    })
    mobileNo: number

    @Column()
    dob: Date

    @Column()
    age: number
}
