import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import StudentRoutes from './routes/Student';
import UserRoutes from './routes/User';
import { connectDatabase } from './config/dataSource';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Replace with the origin of your frontend application
        methods: ['GET', 'POST'],
    },
});
export { io };
const port = process.env.PORT || 4000;

io.on('connection', () => {
    // console.log('A user connected');
    // Additional connection-related logic here
});

const startServer = async () => {
    await connectDatabase();

    app.use(express.json());

    // Apply CORS middleware before routes
    app.use(cors());

    app.use('/api/students', StudentRoutes);
    app.use('/api/users', UserRoutes);

    server.listen(port, () => {
        console.log(`Server started at: http://localhost:${port}`);
    });
};

startServer();
