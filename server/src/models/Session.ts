import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"


@Entity("session")
export class Session {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({
        default:true
    })
    valid: boolean

    @Column()
    name: string
    
    @Column({
        unique:true
    })
    email: string

}
