require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Student } from "../entities/student.entity";
// import config  from "config";

// const postgresConfig = config.get<{
//     host: string;
//     port: number;
//     username: string;
//     password: string;
//     database: string;
// }>('postgresConfig');

export const AppDataSource = new DataSource({
  // ...postgresConfig,
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "rampup",
  synchronize: true,
  logging: false,
  // entities: ["src/entities/**/*.entity{.ts,.js}"],
  entities: [Student],
  migrations: [],
  subscribers: [],
});
