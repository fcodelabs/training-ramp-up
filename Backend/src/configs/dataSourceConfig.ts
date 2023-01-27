import 'reflect-metadata';
import { Student } from '../models/studentModel';
import { User } from '../models/userModel';
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
  entities: [Student, User],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrations: [],
  // ssl: true,
});
