import express, { Express, Request, Response } from 'express';
import studentRoutes from './src/routes/studentRoutes';
import userRoutes from './src/routes/userRoutes';
import dataSource from './src/dataSource';
import cors from 'cors';
import { createServer } from 'http';
import bodyParser from 'body-parser';
// import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

const app: Express = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'your-production-domain'],
  })
);

app.use('/student', studentRoutes);
app.use('/user', userRoutes);
const httpServer = createServer(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Express, TypeScript Server');
});

// export const io = new Server(httpServer, {
//   cors: {
//     origin: 'http://localhost:3000/',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log(`connect ${socket.id}`);

//   socket.on('disconnect', (reason) => {
//     console.log('Got disconnect due to ' + reason + '!');
//   });
// });

httpServer.listen(8000, () => {
  console.log('Application started on port 8000!');
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
