import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student } from "../models/studentModel"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgress",
    database: "student-manager",
    entities: [Student],
    synchronize: true,
    logging: false,
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
