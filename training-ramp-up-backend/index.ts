import 'reflect-metadata'
import * as express from 'express'
import { Express, Request, Response } from 'express'
import { appDataSource } from './src/configs/dataSourceConfig'
import studentRoutes from './src/routes/StudentRoutes'
import { Server } from 'socket.io'
import http = require('http')

const app: Express = express()
const port = 4000
const server = http.createServer(app)

appDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )

    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    )

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    // Pass to next layer of middleware
    next()
})

app.use(express.json())
app.use('/student', studentRoutes)

app.get('/', async (req: Request, res: Response) => {
    res.send('Express + TypeScript Server!!')
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
