import express, { Express, Request, Response } from 'express';
import routes from './src/routes/studentRoutes';

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
