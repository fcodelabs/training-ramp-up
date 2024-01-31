import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('student')
export class Student extends BaseEntity{

    @PrimaryColumn('number',{unique: true})
    id: number;

    @Column('text',{nullable: false})
    name: string;

    @Column('text')
    gender: string;

    @Column('text')
    address: string;

    @Column('text')
    mobile: string;

    @Column('text')
    dob: string;

    @Column('int')
    age: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}