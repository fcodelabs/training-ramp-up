import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from './models/student';
import dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  ssl: { rejectUnauthorized: false },
  migrations: [],
  // username: process.env.DB_USER,
  // database: process.env.DB_DATABASE,
  // password: process.env.DB_PASSWD,
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  url: process.env.DB_URL,
  entities: [Student],
  synchronize: true,
  logging: false
});

AppDataSource.initialize()
  .then(() => {
    console.log('connected..');
  })
  .catch((error) => {
    console.error(error, 'unable to connect..');
  });
export default AppDataSource;
