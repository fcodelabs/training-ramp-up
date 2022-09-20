"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import passport from 'passport';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("reflect-metadata");
const db_1 = __importDefault(require("./util/db"));
const routes_1 = require("./routes");
const deserializeUser_1 = require("./middleware/deserializeUser");
// import { applyJWTStrategy } from './middleware/jwt.strategy';
dotenv_1.default.config();
//creating express server
const app = (0, express_1.default)();
//assigning server port
const port = process.env.PORT;
//creating socket.io server
// const server = http.createServer(app);
// const io =new Server(server,{
//     cors:{
//         origin:"http://localhost:3000",
//         methods:["GET","POST","PUT","DELETE"]
//     }
// })
//declaring middleware
//json to read json blob data from body of request,cors to grant access to endpoints to front end
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(deserializeUser_1.deserializeUser);
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000",
}));
// applyJWTStrategy(passport);
//api endpoints
app.use('/student', routes_1.studentRouter);
app.use('/user', routes_1.userRouter);
//connect to db
db_1.default.initialize()
    .then(() => {
    console.log("✔ [server]:Successfully connected to postgres!");
    // here you can start to work with your database
})
    .catch((error) => console.log(error));
// io.on("connection",(socket)=>{
//     console.log(`✔ [server]:User Connected with id ${socket.id}`);
//     socket.on("student_data_change",()=>{
//         console.log("👁 data has been altered !");
//         socket.broadcast.emit("refetch_data",()=>{
//             console.log("✔ refetching data...");
//         })
//     })
// })
//start server
app.listen(port, () => {
    console.log((`⚡️ [server]:Server is running at https://localhost:${port}`));
});
