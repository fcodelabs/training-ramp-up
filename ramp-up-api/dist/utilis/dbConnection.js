"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const student_1 = __importDefault(require("../entity/student"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: '123Da@',
    database: 'test',
    synchronize: true,
    logging: true,
    entities: [student_1.default],
    subscribers: [],
    migrations: [],
});
