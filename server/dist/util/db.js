"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
const config_1 = require("./config");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: config_1.config.db_port,
    username: config_1.config.db_username,
    password: config_1.config.db_password,
    database: config_1.config.db,
    entities: [models_1.Student, models_1.User, models_1.Session],
    synchronize: true,
    logging: false,
});
exports.default = AppDataSource;
