import { DataSource } from 'typeorm'
import { Student } from '../models/student'
import dotenv from 'dotenv'
dotenv.config()


const AppDataSource = new DataSource({
  
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  entities:[Student]
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err)
  })

export { AppDataSource }
