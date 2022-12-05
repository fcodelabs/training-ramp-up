import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from '../src/entities/studentEntity';
import * as dotenv from 'dotenv';

dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Lp1999#',
  database: 'Student',
  synchronize: true,
  logging: true,
  entities: [Student],
  subscribers: [],
  migrations: [],
});
