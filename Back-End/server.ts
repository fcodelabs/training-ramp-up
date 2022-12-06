import express, { Express, Request, Response } from 'express';
import routes from './src/routes/studentRoutes';
import dataSource from './src/dataSource';

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use('/student', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express, TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .catch((error: any) => {
    console.error('Error during Data Source initialization:', error);
  });
