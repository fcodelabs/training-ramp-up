import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import studentRoutes from './src/routes/Student/StudentRoutes'
// const ioProm = require('express-socket.io')
// const server = ioProm.init(app)

import cors from 'cors'
// use cors middleware to enable CORS with various options

dotenv.config()
const app: Express = express()
const port: number = Number(process.env.PORT)
app.use(cors({ origin: '*' }))

app.use(express.json())
app.use('/student', studentRoutes)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    data: 'Hello'
  })
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
