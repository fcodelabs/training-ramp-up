import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import StudentRoutes from './routes/Student';
import UserRoutes from './routes/User';
import { connectDatabase } from './config/dataSource';
//import { AppDataSource } from './config/dataSource';

export const app = express();  
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://ramp-up-99ab1.web.app/', // Replace with the origin of your frontend application
        methods: ['GET', 'POST'],
    },
});
export { io };
const port = process.env.PORT || 4000;

io.on('connection', () => {
    console.log('A user connected');
   
});

const startServer = async () => {
await connectDatabase();

//    try {
//     await AppDataSource.initialize();
//     console.log("Data Source has been initialized!");
// } catch (err) {
//     console.error("Error during Data Source initialization", err);
// }

    app.use(express.json());

    
    app.use(cors());

    app.use('/api/students', StudentRoutes);
    app.use('/api/users', UserRoutes);

    server.listen(port, () => {
        console.log(`Server started at: http://localhost:${port}`);
    });
};

startServer();
