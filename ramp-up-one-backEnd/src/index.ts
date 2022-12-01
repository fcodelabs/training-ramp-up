import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript  + lahiru ');
});

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
