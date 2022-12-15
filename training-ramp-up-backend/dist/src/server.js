"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
var express = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = express();
var httpServer = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});
httpServer.listen(port, function () {
    console.log('Application started on port ' + port + '!');
});
//# sourceMappingURL=server.js.map