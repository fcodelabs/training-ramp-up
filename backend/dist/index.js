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
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_routes_1 = require("./routes/student.routes");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const user_routes_1 = require("./routes/user.routes");
const auth_routes_1 = require("./routes/auth.routes");
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// const http = require("http").Server(app);
// const io = require("socket.io")(http);
// //Whenever someone connects this gets executed
// io.on("connection", (socket: any) => {
//   console.log("A user connected");
//Whenever someone disconnects this piece of code executed
//   socket.on("disconnect", function () {
//     console.log("A user disconnected");
//   });
// });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/students", student_routes_1.studentRouter);
app.use("/api/users", user_routes_1.userRouter);
app.use("/api/auth", auth_routes_1.authRouter);
const io = new socket_io_1.Server(httpServer);
io.on("connection", (soket) => {
    console.log("client is connected");
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
