"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const Student_1 = __importDefault(require("./routes/Student"));
const User_1 = __importDefault(require("./routes/User"));
const dataSource_1 = require("./config/dataSource");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
exports.io = io;
const port = process.env.PORT || 4000;
io.on('connection', () => {
});
const startServer = async () => {
    await (0, dataSource_1.connectDatabase)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use('/api/students', Student_1.default);
    app.use('/api/users', User_1.default);
    server.listen(port, () => {
        console.log(`Server started at: http://localhost:${port}`);
    });
};
startServer();
//# sourceMappingURL=Server.js.map