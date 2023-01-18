"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const DataSourceConfig_1 = require("./src/configs/DataSourceConfig");
const cors_1 = __importDefault(require("cors"));
const User_1 = require("./src/models/User");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const UserRoutes_1 = __importDefault(require("./src/routes/UserRoutes"));
const PORT = "5000";
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.use("/api/users", UserRoutes_1.default);
app.get("api/", function (_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepo = DataSourceConfig_1.AppDataSource.getRepository(User_1.User);
        const allrecords = yield userRepo.find();
        // res.send(allrecords);
        let user = new User_1.User();
        user.PersonID = 11;
        user.PersonName = "tessadsat";
        user.DateOfBirth = new Date();
        user.PersonGender = "tesasdt";
        user.PersonMobileNo = "tasdest";
        user.PersonAddress = "test";
        const userInsert = yield userRepo.save(user);
        console.log(allrecords);
        res.send(allrecords);
    });
});
//socket io
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: "http://localhost:3000" },
});
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("someone disconnected");
    });
});
//typeorm connection
DataSourceConfig_1.AppDataSource.initialize()
    .then(() => {
    console.log("success connected to the database!");
    httpServer.listen(PORT, () => {
        console.log("server running on port 5000!");
    });
})
    .catch((err) => {
    console.log(err);
});
