import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column()
    mobile: string;

    @Column()
    dob: string;

    @Column()
    age: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
}
