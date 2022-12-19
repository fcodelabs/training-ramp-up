import 'reflect-metadata'
import * as express from 'express'
import { Express } from 'express'
import { appDataSource } from './src/configs/dataSourceConfig'
import studentRoutes from './src/routes/StudentRoutes'
import { createServer } from 'http'
import { Server } from 'socket.io'

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
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    },
})
io.on('connection', (socket) => {
    console.log(`connect ${socket.id}`)
    socket.on('disconnect', (reason) => {
        console.log('Got disconnect due to ' + reason + '!')
    })
})

httpServer.listen(port, () => {
    console.log('Application started on port ' + port + '!')
})
