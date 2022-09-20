import express,{Express} from 'express';
import dotenv from 'dotenv';
import http from "http";
import {Server} from "socket.io";
import cors from "cors";
// import passport from 'passport';
import cookieParser from 'cookie-parser';
import "reflect-metadata";
import  AppDataSource  from './util/db';

import {studentRouter,userRouter} from "./routes";
import { deserializeUser } from './middleware/deserializeUser';
// import { applyJWTStrategy } from './middleware/jwt.strategy';

dotenv.config();

//creating express server
const app:Express = express();
//assigning server port
const port =process.env.PORT;
//creating socket.io server
// const server = http.createServer(app);
// const io =new Server(server,{
//     cors:{
//         origin:"http://localhost:3000",
//         methods:["GET","POST","PUT","DELETE"]
//     }
// })
//declaring middleware
//json to read json blob data from body of request,cors to grant access to endpoints to front end

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(deserializeUser);
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  
// applyJWTStrategy(passport);
//api endpoints
app.use('/student',studentRouter);
app.use('/user',userRouter);


//connect to db
AppDataSource.initialize()
    .then(() => {
        console.log("✔ [server]:Successfully connected to postgres!")
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

// io.on("connection",(socket)=>{
//     console.log(`✔ [server]:User Connected with id ${socket.id}`);
//     socket.on("student_data_change",()=>{
//         console.log("👁 data has been altered !");
//         socket.broadcast.emit("refetch_data",()=>{
//             console.log("✔ refetching data...");
//         })
//     })
// })

//start server
app.listen(port,()=>{
    console.log((`⚡️ [server]:Server is running at https://localhost:${port}`))
});

