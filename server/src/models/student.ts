import { Entity ,Column, PrimaryGeneratedColumn  } from "typeorm";
@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    name: string

    @Column({ length: 10 })
    gender: string

    @Column({ length: 200, nullable: true })
    address: string

    @Column({ length: 15, nullable: true })
    mobileno: string

    @Column({ type: 'date', nullable: true })
    dob: Date

    @Column()
    age: number
}