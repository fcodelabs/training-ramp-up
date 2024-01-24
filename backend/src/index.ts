import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { DataSource } from "typeorm"
import { studentRoutes } from "./routes/studentRoute"
import cors from "cors"

dotenv.config()

const app: Express = express()
app.use(express.json())
const port = process.env.PORT || 5000
app.use(
  cors({
    origin: "http://localhost:3000", // replace with the URL of your frontend
  }),
)

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "27090",
  database: "Ramp-up",
  entities: ["src/models/**/*.ts"],
  synchronize: true,
  logging: true,
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

studentRoutes(app)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server")
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
