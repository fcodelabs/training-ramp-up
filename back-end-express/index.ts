import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import studentRoutes from './src/routes/StudentRoutes'
import userRoutes from './src/routes/UserRoutes'
import DatabaseService from './src/services/DatabaseService'
import cookieParser from 'cookie-parser'
import { app, httpServer, io } from './server'

dotenv.config()

const port: number = Number(process.env.PORT)

app.use(express.json())
app.use(cookieParser())
app.use('/student', studentRoutes)
app.use('/user', userRoutes)

io.on('connection', (socket: any) => {
  console.log(`connect server ${socket.id}`)
})

httpServer.listen(port, () => {
  console.log(`HTTP Server is running on port ${port}`)
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
