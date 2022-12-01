import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import studentRoutes from './src/routes/Student/StudentRoutes'

dotenv.config()
const app: Express = express()
const port: string | number = process.env.PORT ?? 3000

app.use(express.json())
app.use('/student', studentRoutes)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    data: 'Hello'
  })
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
