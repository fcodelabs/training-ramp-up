import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({unique: true})
    email: string;

    @Column({default:'Observer'})
    role: string;

    @Column({nullable: true})
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}