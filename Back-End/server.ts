import express, { Express, Request, Response } from 'express';
import routes from './src/routes/studentRoutes';
import dataSource from './src/dataSource';
import cors from 'cors';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';

const app: Express = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use('/student', routes);
const httpServer = createServer(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Express, TypeScript Server');
});

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log(`connect ${socket.id}`);

  // socket.on('student_add', (data) => {
  //   socket.broadcast.emit('student_added', data);
  // });

  socket.on('student_upsert', (data) => {
    socket.broadcast.emit('student_added_or_updated', data);
  });

  socket.on('student_delete', (data) => {
    socket.broadcast.emit('student_deleted', data);
  });
});

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
