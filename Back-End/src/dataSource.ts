import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from './entities/studentEntity';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: 'nomadbuddy-postgres-db.postgres.database.azure.com',
  port: 5432,
  username: 'nomad_admin',
  password: 'Digital1234*',
  database: 'rampup',
  entities: [Student],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrations: [],
  ssl: true,
});

export default dataSource;
