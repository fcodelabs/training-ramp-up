import { io,app,server } from './src/utils/app'
import studentRouter from './src/routes/stuedentRouter'
import morgan from 'morgan'
import express, { Express } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT
app.use(morgan('tiny'))
app.use(express.json())

app.use('/student', studentRouter)
app.use('/user', studentRouter)

server.listen(port, () => {
  console.log(`[Server]:Running at localhost:${port}`)
})
