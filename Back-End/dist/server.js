"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentRoutes_1 = __importDefault(require("./src/routes/studentRoutes"));
const dataSource_1 = __importDefault(require("./src/dataSource"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/student', studentRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Express, TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
dataSource_1.default
    .initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((error) => {
    console.error('Error during Data Source initialization:', error);
});
