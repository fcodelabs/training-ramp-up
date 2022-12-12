import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Student } from '../models/Student'

export const appDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'studentdetails',
    synchronize: true,
    logging: false,
    entities: [Student],
    migrations: [],
    subscribers: [],
})
