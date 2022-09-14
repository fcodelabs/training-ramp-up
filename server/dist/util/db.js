"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Student_1 = require("../models/Student");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgress",
    database: "postgres",
    entities: [Student_1.Student],
    synchronize: true,
    logging: false,
});
exports.default = AppDataSource;
