import { DataSource } from "typeorm";
import { Student } from "./entity/Student";
import { config } from "dotenv";
import { User } from "./entity/User";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 6000,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [Student, User],
  subscribers: [],
  migrations: [],
});
