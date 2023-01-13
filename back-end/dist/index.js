"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var studentRoutes_1 = __importDefault(require("./src/routes/studentRoutes"));
var userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
var databaseService_1 = __importDefault(require("./src/services/databaseService"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var server_1 = require("./server");
dotenv_1.default.config();
var port = Number(process.env.PORT);
server_1.app.use(express_1.default.json());
server_1.app.use((0, cookie_parser_1.default)());
server_1.app.use('/student', studentRoutes_1.default);
server_1.app.use('/user', userRoutes_1.default);
server_1.io.on('connection', function (socket) {
    console.log("connect server ".concat(socket.id));
});
server_1.httpServer.listen(port, function () {
    console.log("HTTP Server is running on port ".concat(port));
});
server_1.app.get('/', function (req, res, next) {
    res.status(200).json({
        data: 'Hello'
    });
});
databaseService_1.default.initialize().then(function () {
    console.log('Data Source has been initialized!');
})
    .catch(function (err) {
    console.error('Error during Data Source initialization:', err);
});
//# sourceMappingURL=index.js.map