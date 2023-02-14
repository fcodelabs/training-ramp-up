/* eslint-disable prettier/prettier */
import { Student } from 'src/entity/student';
import { User } from 'src/entity/user';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'test_db',
  entities: [Student,User],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
