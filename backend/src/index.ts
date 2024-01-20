/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-misused-promises */
import 'reflect-metadata';
import express from 'express';
import router from './routes/student.routes';
import cors from 'cors';

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use('/students', router);

app.listen(5000, () => {
  console.log('server is running on port: 5000');
});
