import { type DataSourceOptions, DataSource } from 'typeorm';
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
  logging: false,
  entities: ['src/models/**/*.ts'],
  migrations: [],
  subscribers: []
};

const dataSource = new DataSource(AppDataSource);

dataSource
  .initialize()
  .then(() => {
    console.log('connected to database');
  })
  .catch((error) => {
    console.error(error, 'unable to connect to database');
  });
export default dataSource;
