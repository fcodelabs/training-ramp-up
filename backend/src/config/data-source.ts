import "reflect-metadata";
import { DataSource } from "typeorm";
import { Student } from "../entity/student";
import * as dotenv from "dotenv";
import { User } from "../entity/user";
dotenv.config();

// export const AppDataSource = new DataSource({
//   url: process.env.PG_DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
//   type: "postgres",
//   synchronize: true,
//   logging: false,
//   entities: [Student, User],
//   migrations: [],
//   subscribers: [],
// });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "200551R",
  database: "ramp-up",
  entities: [Student, User],
  synchronize: false,
  logging: true,
});
