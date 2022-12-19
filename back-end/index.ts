import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import studentRoutes from './src/routes/Student/StudentRoutes'
import * as http from 'http'
import * as socketio from 'socket.io'
import cors from 'cors'

dotenv.config()
const app: Express = express()
const httpServer: http.Server = new http.Server(app)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}))
export const io: any = new socketio.Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
})
const port: number = Number(process.env.PORT)

app.use(express.json())
app.use('/student', studentRoutes)

io.on('connection', (socket: any) => {
  console.log(`connect server ${socket.id}`)
})

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    data: 'Hello'
  })
})

// app.listen(port, () => console.log(`App is running on port ${port}`))
