import 'reflect-metadata';
import { Student } from '../models/Student';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'ramp-up',
  entities: [Student],
  // entities: ['src/models/*{.ts,.js}'],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrations: [],
  // ssl: true,
});
