"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require("reflect-metadata");
var express = require("express");
var dataSourceConfig_1 = require("./src/configs/dataSourceConfig");
var StudentRoutes_1 = require("./src/routes/StudentRoutes");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = express();
var httpServer = (0, http_1.createServer)(app);
var port = 4000;
dataSourceConfig_1.appDataSource
    .initialize()
    .then(function () {
    console.log('Data Source has been initialized!');
})
    .catch(function (err) {
    console.error('Error during Data Source initialization:', err);
});
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
});
app.use(express.json());
app.use('/student', StudentRoutes_1.default);
// app.get('/', async (req: Request, res: Response) => {
//     res.send('Express + TypeScript Server!!')
// })
// app.listen(port, () => {
//     console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
// })
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});
exports.io.on('connection', function (socket) {
    console.log("connect ".concat(socket.id));
});
httpServer.listen(port, function () {
    console.log('Application started on port ' + port + '!');
});
//# sourceMappingURL=index.js.map