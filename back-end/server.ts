import * as http from 'http'
import * as socketio from 'socket.io'
import cors from 'cors'
import express, { Express } from 'express'

export const app: Express = express()
export const httpServer: http.Server = new http.Server(app)
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
  exposedHeaders: ['accesskey', 'refreshkey']
}))

export const io: any = new socketio.Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
    exposedHeaders: ['accesskey', 'refreshkey']
  }
})
