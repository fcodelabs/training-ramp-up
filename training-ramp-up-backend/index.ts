import 'reflect-metadata'
import * as express from 'express'
import { Express, Request, Response } from 'express'
import { appDataSource } from './src/configs/dataSourceConfig'
import studentRoutes from './src/routes/StudentRoutes'

import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import cors = require('cors')

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

app.use(cors()) 
app.use(express.json())
app.use('/student', studentRoutes)

export const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000/',
        methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    },
})
io.on('connection', (socket) => {
    console.log(`connect ${socket.id}`)
})

httpServer.listen(port, () => {
    console.log('Application started on port ' + port + '!')
})
