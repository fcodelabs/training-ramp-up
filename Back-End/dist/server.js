"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StudentRoutes_1 = __importDefault(require("./src/routes/StudentRoutes"));
const dataSource_1 = __importDefault(require("./src/dataSource"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use((0, cors_1.default)());
app.use('/student', StudentRoutes_1.default);
const httpServer = (0, http_1.createServer)(app);
app.get('/', (req, res) => {
    res.send('Express, TypeScript Server');
});
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});
io.on('connection', (socket) => {
    console.log(`connect ${socket.id}`);
    socket.on('student_add', (data) => {
        socket.broadcast.emit('student_added', data);
    });
    socket.on('student_update', (data) => {
        socket.broadcast.emit('student_updated', data);
    });
    socket.on('student_delete', (data) => {
        socket.broadcast.emit('student_deleted', data);
    });
});
httpServer.listen(8000, () => {
    console.log('Application started on port 8000!');
});
dataSource_1.default
    .initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((error) => {
    console.error('Error during Data Source initialization:', error);
});
