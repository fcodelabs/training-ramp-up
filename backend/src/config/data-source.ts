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
  synchronize: true,
  logging: false,
  entities: [Student],
  migrations: [],
  subscribers: [],
});
