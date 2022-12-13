"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var StudentRoutes_1 = __importDefault(require("./src/routes/Student/StudentRoutes"));
// const ioProm = require('express-socket.io')
// const server = ioProm.init(app)
var cors_1 = __importDefault(require("cors"));
// use cors middleware to enable CORS with various options
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = Number(process.env.PORT);
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.use('/student', StudentRoutes_1.default);
app.get('/', function (req, res, next) {
    res.status(200).json({
        data: 'Hello'
    });
});
app.listen(port, function () { return console.log("Server is running on port ".concat(port)); });
//# sourceMappingURL=index.js.map