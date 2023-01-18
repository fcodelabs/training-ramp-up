import express, { Express, Request, Response } from 'express'
import userRouter from './src/routes/userRoute'
import morgan from 'morgan'

const app: Express = express()
const port = 4000

app.use(morgan('tiny'));
app.use(express.json());

app.use('/user',userRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('User Data retrieve');
})


app.listen(port, () => {
  console.log(`[Server]:Running at localhost:${port}`)
})
