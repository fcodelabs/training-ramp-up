/* eslint-disable prettier/prettier */
import { Student } from 'src/students/entity/student';
import { User } from 'src/auth/entity/user';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username:process.env.USERNAME,
  password: process.env.PASSWORD,
  database: 'test_db',
  entities: [Student,User],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
