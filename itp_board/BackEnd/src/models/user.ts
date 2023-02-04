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

    @Column('boolean')
    admin: boolean | undefined


}

export {User}
