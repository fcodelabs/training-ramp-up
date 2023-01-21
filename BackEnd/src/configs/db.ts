import { DataSource } from "typeorm"
import { Student } from "../models/StudentModel"

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: "localhost",
  port: 5432,
  username: "me",
  password: "password",
  database: "ramp-up",
  synchronize: true,
  entities: [Student]
})
