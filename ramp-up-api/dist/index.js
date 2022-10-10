'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const AppDataSource_1 = require('./utilis/AppDataSource');
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
AppDataSource_1.AppDataSource.initialize()
  .then(() => console.log('DB Connected'))
  .catch((error) => console.log(error));
app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
// const main = async () => {
//   try {
//     await createConnection({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'laithharb',
//       password: undefined,
//       database: 'typeorm',
//       entities: [Student],
//       synchronize: true,
//     });
//     console.log('Connected to Postgres');
//     app.use(express.json());
//     app.listen(8080, () => {
//       console.log('Now running on port 8080');
//     });
//   } catch (error) {
//     console.error(error);
//     throw new Error('Unable to connect to db');
//   }
// };
// main();
