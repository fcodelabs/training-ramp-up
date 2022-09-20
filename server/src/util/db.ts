import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student, User, Session } from "../models"
import dotenv from 'dotenv';

dotenv.config();

const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;
const port = Number(process.env.DB_PORT);
const database = process.env.DB_NAME;

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port:port,
    username,
    password,
    database,
    entities: [Student,User,Session],
    synchronize: true,
    logging: false,
})

export default AppDataSource;