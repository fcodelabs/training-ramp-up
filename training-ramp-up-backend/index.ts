import 'reflect-metadata'
import * as express from 'express'
import { Express, Request, Response } from 'express'
import { appDataSource } from './src/configs/dataSourceConfig'
import studentRoutes from './src/routes/StudentRoutes'
import cors = require('cors')



const app: Express = express()
const port = 4000
app.use(cors())

appDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })

app.use(express.json())
app.use('/student', studentRoutes)

app.get('/', async (req: Request, res: Response) => {
    res.send('Express + TypeScript Server!!')
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
