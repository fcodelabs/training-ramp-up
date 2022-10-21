import "reflect-metadata";
import { DataSource } from "typeorm";
import { Student } from "./entities/studentEntity";
import { User } from "./entities/userEntity";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Student, User],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrations: [],
});
