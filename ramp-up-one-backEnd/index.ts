import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './src/dataSource';
import studentRoutes from './src/routes/studentRoute';
dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());


app.use('/student', studentRoutes);

app.listen(port, () => {
  console.log(`application is running on port ${port}.`);
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error: any) => {
    console.error('Error during Data Source initialization:', error);
  });
