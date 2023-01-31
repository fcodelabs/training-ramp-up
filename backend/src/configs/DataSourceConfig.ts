import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "test_db",
  entities: ["src/models/*{.ts,.js}"],
  synchronize: true,
  logging: false,
  // logger: "file",
});
