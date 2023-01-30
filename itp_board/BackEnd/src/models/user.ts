import { Entity, Column,PrimaryColumn } from 'typeorm'

@Entity()
class User {

    @PrimaryColumn('varchar')
    email: string | undefined

    @Column('varchar')
    firstName: string | undefined

    @Column('varchar')
    lastName: string | undefined

    @Column('varchar')
    password: string | undefined
}

export {User}
