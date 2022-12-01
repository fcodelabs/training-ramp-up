import express, { Express, Request, Response } from 'express'

import student from './src/controllers/Student/StudentController'

const app: Express = express()
const port = 3000

app.use(express.json())
app.use('/student', student)

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server!!')
})

app.get('/hello', (req: Request, res: Response) => {
	res.send('Hello TypeScript Server!!')
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})