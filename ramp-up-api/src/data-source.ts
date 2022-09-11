import { DataSource } from "typeorm";
import { Student } from "./entity/Student";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 6000,
  username: "postgres",
  password: "anu02072000",
  database: "students",
  synchronize: true,
  logging: true,
  entities: [Student],
  subscribers: [],
  migrations: [],
});
