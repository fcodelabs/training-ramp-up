"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const db_1 = __importDefault(require("./util/db"));
const Student_1 = __importDefault(require("./routes/Student"));
dotenv_1.default.config();
//creating express server
const app = (0, express_1.default)();
//assigning server port
const port = process.env.PORT;
//creating socket.io server
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});
//declaring middleware
//json to read json blob data from body of request,cors to grant access to endpoints to front end
app.use([express_1.default.json(), (0, cors_1.default)()]);
app.use(express_1.default.urlencoded({ extended: true }));
//api endpoints
app.use('/student', Student_1.default);
//connect to db
db_1.default.initialize()
    .then(() => {
    console.log("✔ [server]:Successfully connected to postgres!");
    // here you can start to work with your database
})
    .catch((error) => console.log(error));
io.on("connection", (socket) => {
    console.log(`👌 [server]:User Connected with id ${socket.id}`);
    socket.on("student_data_change", () => {
        console.log("👁 data has been altered !");
        socket.broadcast.emit("refetch_data", () => {
            console.log("💿 refetching data...");
        });
    });
});
//start server
server.listen(port, () => {
    console.log((`⚡️ [server]:Server is running at https://localhost:${port}`));
});
