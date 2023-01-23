import "reflect-metadata";
import { AppDataSource } from "./src/configs/dbConfig";
const app = require("./server");
const port = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(async (connection) => {console.log('Database connected')})
  .catch((error) => console.log(error));

app.listen(port, () => console.log("App is running at port 8080."));
