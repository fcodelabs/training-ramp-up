import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student } from "../models/Student"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgress",
    database: "postgres",
    entities: [Student],
    synchronize: true,
    logging: false,
})

export default AppDataSource;