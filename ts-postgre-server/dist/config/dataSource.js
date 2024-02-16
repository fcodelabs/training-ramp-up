"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const typeorm_1 = require("typeorm");
const connectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'nethdb123',
    database: 'postgres',
    synchronize: true,
    entities: [__dirname + '/../models/*{.js,.ts}'],
};
const connectDatabase = async () => {
    try {
        await (0, typeorm_1.createConnection)(connectionOptions);
        console.log('Connected to the PostgreSQL database.');
    }
    catch (error) {
        console.error('Unable to connect to the PostgreSQL database.');
        console.error(error);
    }
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=dataSource.js.map