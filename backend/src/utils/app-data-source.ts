import { DataSource } from "typeorm";
import { Student } from "../entity/student";
import { User } from "../entity/user";
import { RefreshToken } from "../entity/refreshToken";
import * as dotenv from "dotenv";

dotenv.config();

export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [Student, User, RefreshToken],
  logging: true,
  synchronize: true,
});
