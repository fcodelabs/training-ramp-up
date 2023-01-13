import 'reflect-metadata'
import * as express from 'express'
import { appDataSource } from './src/configs/dataSourceConfig'
import studentRoutes from './src/routes/studentRoutes'
import userRoutes from './src/routes/userRoutes'
import { app, httpServer, io } from './server'

import * as dotenv from 'dotenv'
dotenv.config()

import cookieParser = require('cookie-parser')

const port = 4000

appDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })

app.use(express.json())
app.use(cookieParser())
app.use('/student', studentRoutes)
app.use('/user', userRoutes)

io.on('connection', (socket) => {
    console.log('connected on ' + socket.id + '!')
    socket.on('disconnect', (reason) => {
        console.log(socket.id + 'Got disconnect due to ' + reason + '!')
    })
})

httpServer.listen(port, () => {
    console.log('Application started on port ' + port + '!')
})
