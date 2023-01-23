import "reflect-metadata";
import { AppDataSource } from "./src/configs/dbConfig";
const server = require("./server");
const port = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(async (connection) => {console.log('Database connected')})
  .catch((error) => console.log(error));

server.listen(port, () => console.log("App is running at port 8080."));
