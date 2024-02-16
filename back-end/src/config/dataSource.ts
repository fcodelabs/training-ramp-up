import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: true,
  entities: ['src/models/**/*.ts'],
  migrations: [],
  subscribers: [],
};

export default AppDataSource;
