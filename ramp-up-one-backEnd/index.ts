import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
import studentRoutes from './src/routes/studentRoute';

app.use('/student',studentRoutes);

//get default
app.get('/', (req: Request, res: Response) => {
  res.send('default');
});

app.listen(port, () => {
  console.log(`application is running on port ${port}.`);
});
