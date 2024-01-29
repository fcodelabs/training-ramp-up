import express from 'express';
import cors from 'cors';

import StudentRoutes from './routes/Student'
import { connectDatabase } from './config/dataSource';

const app = express();
const port = process.env.PORT || 4000;

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