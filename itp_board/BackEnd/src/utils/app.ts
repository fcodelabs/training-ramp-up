import express, { Express } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { sockets } from './sockets'


const app: Express = express()
const server = http.createServer(app)
app.use(cors())

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
})

io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`)
  sockets.push(socket);
})


export {io,app, server};
