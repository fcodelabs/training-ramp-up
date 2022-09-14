"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Student_1 = __importDefault(require("./routes/Student"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
//middleware
// read url encoded data from body of request
app.use(express_1.default.json());
app.use('/student', Student_1.default);
//start server
app.listen(port, () => {
    console.log((`⚡️[server]:Server is running at https://localhost:${port}`));
});
