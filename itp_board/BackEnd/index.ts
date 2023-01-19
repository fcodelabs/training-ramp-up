import express, { Express, Request, Response } from 'express'
import studentRouter from './src/routes/stuedentRouter'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(morgan('tiny'))
app.use(express.json())

app.use('/student', studentRouter)
app.get('/', (req: Request, res: Response) => {
  res.send('User Data retrieve')
})

app.listen(port, () => {
  console.log(`[Server]:Running at localhost:${port}`)
})
