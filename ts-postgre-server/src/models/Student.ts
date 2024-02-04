import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('student')
export class Student extends BaseEntity{

    @PrimaryColumn({unique: true})
    id: number;

    @Column({nullable: false})
    name: string;

    @Column()
    gender: string;

    @Column()
    address: string;

    @Column()
    mobile: string;

    @Column()
    dob: string;

    @Column()
    age: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}