import { Entity, Column, PrimaryGeneratedColumn,BaseEntity } from "typeorm"

@Entity("student")
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    gender: string

    @Column()
    address: string

    @Column({
        unique:true,
    })
    mobileNo: number

    @Column()
    dob: Date

    @Column()
    age: number
}