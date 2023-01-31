import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1998",
  database: "ramp-up",
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
