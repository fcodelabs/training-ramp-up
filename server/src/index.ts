import express,{Express} from 'express';
import dotenv from 'dotenv';

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

