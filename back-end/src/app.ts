import express , { Application, Request, Response} from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Helloo World   Jopsd!');
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
