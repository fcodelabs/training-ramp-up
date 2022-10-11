import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from '../entity/Student';
import { User } from '../entity/User';
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_USERNAME,
  synchronize: true,
  logging: false,
  entities: [Student, User],
  migrations: [],
  subscribers: [],
});
