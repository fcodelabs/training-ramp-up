import 'reflect-metadata'
import * as express from 'express'
import { Express, Request, Response } from 'express'
import { Student } from './src/models/Student'
import { appDataSource } from './src/configs/dataSourceConfig'
import student from './src/controllers/StudentController'

appDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })

const app: Express = express()
const port = 3000

app.use(express.json())
app.use('/student', student)

app.get('/', async (req: Request, res: Response) => {
    res.send('Express + TypeScript Server!!')
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
