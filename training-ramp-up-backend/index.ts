import 'reflect-metadata'
import * as express from 'express'
import { Express } from 'express'
import { appDataSource } from './src/configs/dataSourceConfig'
import studentRoutes from './src/routes/studentRoutes'
import userRoutes from './src/routes/userRoutes'
import { createServer } from 'http'
import { Server } from 'socket.io'
import * as dotenv from 'dotenv' 
dotenv.config()

import cors = require('cors')
import cookieParser = require('cookie-parser')

const app: Express = express()
const httpServer = createServer(app)
const port = 4000

appDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "your-production-domain"],
    
  }))
app.use(express.json())
app.use(cookieParser())
app.use('/student', studentRoutes)
app.use('/user', userRoutes)


export const io = new Server(httpServer, {
    cors: {
        
        origin: 'http://localhost:3000/',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    },
})
io.on('connection', (socket) => {
    console.log('connected on ' + socket.id + '!')
    socket.on('disconnect', (reason) => {
        
        console.log(socket.id+'Got disconnect due to ' + reason + '!')
    })
})

httpServer.listen(port, () => {
    console.log('Application started on port ' + port + '!')
})
