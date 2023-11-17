import { DataSource } from "typeorm";
import { Student } from "./src/entity/student";
import { User } from "./src/entity/user";
import { RefreshToken } from "./src/entity/refreshToken";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "0779641878",
  database: "student-details",
  entities: [Student, User, RefreshToken],
  logging: true,
  synchronize: true,
});
