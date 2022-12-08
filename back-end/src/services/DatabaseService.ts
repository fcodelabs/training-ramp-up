import { DataSource } from 'typeorm'
import 'reflect-metadata'
import * as dotenv from 'dotenv'
import Student from '../entity/Student'

dotenv.config()

const DatabaseService = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Student],
  synchronize: true,
  logging: false
})

export default DatabaseService
