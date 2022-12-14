import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from './entities/StudentEntity';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Student],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrations: [],
  ssl: true,
});

export default dataSource;
