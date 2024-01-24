import "reflect-metadata";
import { DataSource } from "typeorm";
import { Student } from "../entity/Student";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  url: process.env.PG_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  type: "postgres",
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Student],
  migrations: [],
  subscribers: [],
});
