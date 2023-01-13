import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Student } from '../models/student'
import { User } from '../models/user'

export const appDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'studentdetails',
    synchronize: true,
    logging: false,
    entities: [Student, User],
    migrations: [],
    subscribers: [],
})
