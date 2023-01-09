import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import StudentRoutes from './src/routes/StudentRoutes'
import UserRoutes from './src/routes/UserRoutes'
import * as http from 'http'
import * as socketio from 'socket.io'
import cors from 'cors'
import DatabaseService from './src/services/DatabaseService'
import cookieParser from 'cookie-parser'

dotenv.config()
const app: Express = express()
const httpServer: http.Server = new http.Server(app)
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
  exposedHeaders: ['accesskey', 'refreshkey']
}))
export const io: any = new socketio.Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
    exposedHeaders: ['accesskey', 'refreshkey']
  }
})
const port: number = Number(process.env.PORT)

app.use(express.json())
app.use(cookieParser())
app.use('/student', StudentRoutes)
app.use('/user', UserRoutes)

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

DatabaseService.initialize().then(() => {
  console.log('Data Source has been initialized!')
})
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

// app.listen(port, () => console.log(`App is running on port ${port}`))
