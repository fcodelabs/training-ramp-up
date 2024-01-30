"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/index.js
// import "reflect-metadata";
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const studentRoute_1 = __importDefault(require("./routes/studentRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const Student_1 = require("./models/Student");
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 8000;
const server = http_1.default.createServer(app);
// const io = new Server(server);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
});
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.LOCALHOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    // host: process.env.DEPLOYED_HOST,
    // port: 5432,
    // username: process.env.DEPLOYED_USERNAME,
    // password: process.env.DEPLOYED_PASSWORD,
    // database: process.env.DEPLOYED_DB,
    // url: process.env.DEPLOYED_URL,
    logging: true,
    entities: [Student_1.Student],
    // ssl: {
    //   rejectUnauthorized: false,
    // },
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected");
    // app.listen(port, () => {
    //   console.log(`Server running on port ${port}`);
    // });
    server.listen(5000, () => {
        console.log("server is running on port 5000");
    });
})
    .catch((err) => {
    console.log("Error while connecting to the database", err);
});
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/student", (0, studentRoute_1.default)(io));
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
// app.use((err: any, req: Request, res: Response) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "something went wrong!";
//   return res.status(errorStatus).json({
//       success: false,
//       status: errorStatus,
//       message: errorMessage,
//       stack: err.stack,
//   });
// });
