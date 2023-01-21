import express from 'express'
import bodyparser from 'body-parser'
import { PostgresDataSource } from './configs/db'
import studentRouter from './routes/studentRoutes'

const app = express()

app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
)

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


app.listen(3000, () => {
  console.log('The application is listening on port 3000!')
})
