"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("reflect-metadata");
const db_1 = __importDefault(require("./util/db"));
const routes_1 = require("./routes");
const local_auth_guard_1 = require("./middleware/local.auth.guard");
const config_1 = require("./util/config");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(local_auth_guard_1.LocalAuthGuard);
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use('/student', routes_1.studentRouter);
app.use('/user', routes_1.userRouter);
db_1.default.initialize()
    .then(() => {
    console.log("✔ [server]:Successfully connected to postgres!");
})
    .catch((error) => console.log(error));
app.listen(config_1.config.port, () => {
    console.log((`⚡️ [server]:Server is running at https://localhost:${config_1.config.port}`));
});
