"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const student_1 = require("./src/entity/student");
const user_1 = require("./src/entity/user");
const refreshToken_1 = require("./src/entity/refreshToken");
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "0779641878",
    database: "student-details",
    entities: [student_1.Student, user_1.User, refreshToken_1.RefreshToken],
    logging: true,
    synchronize: true,
});
