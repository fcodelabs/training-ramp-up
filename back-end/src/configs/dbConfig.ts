import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: "postgres",
  password: "1998",
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  // "cli": {
  //   "entitiesDir": "src/models",
  //   "migrationsDir": "src/migration",
  //   "subscribersDir": "src/subscriber"
  // }
});
