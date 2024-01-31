
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import http from 'http';

import StudentRoutes from './routes/Student'
import { connectDatabase } from './config/dataSource';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: 'http://localhost:3000', // Replace with the origin of your frontend application
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

    app.use(express.json());
    app.use(cors());

    app.use('/api/students',StudentRoutes);


    app.listen(port, ()=>{
        console.log(`Server started at: http://localhost:${port}`)
    })
}

startServer();
export default app;