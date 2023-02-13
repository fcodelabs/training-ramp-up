import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: (process.env.DB_PASSWORD as string) || "1234",
  database: (process.env.DB_NAME as string) || "test_db",
  entities: ["src/models/*{.ts,.js}"],
  synchronize: true,
  logging: false,
  // logger: "file",
});
