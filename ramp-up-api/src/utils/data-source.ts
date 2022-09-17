require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Student } from "../entities/student.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "rampup",
  synchronize: true,
  logging: false,

  entities: [Student],
  migrations: [],
  subscribers: [],
});
