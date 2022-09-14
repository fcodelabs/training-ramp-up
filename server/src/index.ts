import express,{Express} from 'express';
import dotenv from 'dotenv';
import http from "http";
import {Server} from "socket.io";
import cors from "cors";
import "reflect-metadata";
import  AppDataSource  from './util/db';

import studentRouter from "./routes/Student";

dotenv.config();

//creating express server
const app:Express = express();
//assigning server port
const port =process.env.PORT;
//creating socket.io server
const server = http.createServer(app);
const io =new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST","PUT","DELETE"]
    }
})
//declaring middleware
//json to read json blob data from body of request,cors to grant access to endpoints to front end
app.use([express.json(),cors()]);
app.use(express.urlencoded({ extended: true }))
//api endpoints
app.use('/student',studentRouter);


//connect to db
AppDataSource.initialize()
    .then(() => {
        console.log("✔ [server]:Successfully connected to postgres!")
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

io.on("connection",(socket)=>{
    console.log(`👌 [server]:User Connected with id ${socket.id}`);
    socket.on("student_data_change",()=>{
        console.log("👁 data has been altered !");
        socket.broadcast.emit("refetch_data",()=>{
            console.log("💿 refetching data...");
        })
    })
})

//start server
server.listen(port,()=>{
    console.log((`⚡️ [server]:Server is running at https://localhost:${port}`))
});

