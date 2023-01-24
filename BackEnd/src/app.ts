import express from 'express'
import bodyparser from 'body-parser'
import { PostgresDataSource } from './configs/db'
import studentRouter from './routes/studentRoutes'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
)

//socket io
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
})


io.on("connection", (socket) => {
  console.log('a user connected', socket.id)

  socket.on('user_added', (data) => {
    console.log('user_added', data)
    socket.broadcast.emit('user_added', data)
  })
  socket.on('user_updated', (data) => {
    console.log('user_updated', data)
    socket.broadcast.emit('user_updated', data)
  })
  socket.on('user_removed', (data) => {
    console.log('user_removed', data)
    socket.broadcast.emit('user_removed', data)
  })
})
 

PostgresDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })



app.get('/', (req, res) => {
  res.send('Well done4!')
})


app.use('/home', studentRouter)

//app.listen
server.listen(3001, () => {
  console.log('The application is listening on port 3001!')
})
