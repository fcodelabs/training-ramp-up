import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

export const app = express()
export const server = http.createServer(app)

//socket io
export const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
})