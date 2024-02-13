import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('student')
export class Student extends BaseEntity{

    @PrimaryColumn({unique: true})
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({ type: 'varchar' })
    gender: string;

    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'varchar' })
    mobile: string;

    @Column({ type: 'varchar' })
    dob: string;

    @Column()
    age: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}