"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Student_1 = require("../models/Student");
exports.appDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'studentdetails',
    synchronize: true,
    logging: false,
    entities: [Student_1.Student],
    migrations: [],
    subscribers: []
});
//# sourceMappingURL=dataSourceConfig.js.map