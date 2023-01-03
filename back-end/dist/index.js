"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var StudentRoutes_1 = __importDefault(require("./src/routes/StudentRoutes"));
var UserRoutes_1 = __importDefault(require("./src/routes/UserRoutes"));
var http = __importStar(require("http"));
var socketio = __importStar(require("socket.io"));
var cors_1 = __importDefault(require("cors"));
var DatabaseService_1 = __importDefault(require("./src/services/DatabaseService"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var httpServer = new http.Server(app);
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
    exposedHeaders: ['accesskey', 'refreshkey']
}));
exports.io = new socketio.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
        exposedHeaders: ['accesskey', 'refreshkey']
    }
});
var port = Number(process.env.PORT);
app.use(express_1.default.json());
app.use('/student', StudentRoutes_1.default);
app.use('/user', UserRoutes_1.default);
exports.io.on('connection', function (socket) {
    console.log("connect server ".concat(socket.id));
});
httpServer.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
app.get('/', function (req, res, next) {
    res.status(200).json({
        data: 'Hello'
    });
});
DatabaseService_1.default.initialize().then(function () {
    console.log('Data Source has been initialized!');
})
    .catch(function (err) {
    console.error('Error during Data Source initialization:', err);
});
// app.listen(port, () => console.log(`App is running on port ${port}`))
//# sourceMappingURL=index.js.map