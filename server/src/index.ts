import express,{Express} from 'express';
import dotenv from 'dotenv';
import "reflect-metadata";
import { AppDataSource } from './util/db';

import studentRouter from "./routes/Student";

dotenv.config();

const app:Express = express();
const port =process.env.PORT;

//middleware
// read url encoded data from body of request
app.use(express.json())

app.use('/student',studentRouter);



//start server
app.listen(port,()=>{
    console.log((`⚡️[server]:Server is running at https://localhost:${port}`))
});

//connect to db
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
