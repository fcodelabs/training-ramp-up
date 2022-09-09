import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from '../entity/Student';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123Da@',
  database: 'test3',
  synchronize: true,
  logging: false,
  entities: [Student],
  migrations: [],
  subscribers: [],
});
