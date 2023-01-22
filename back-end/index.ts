import "reflect-metadata";
import { createConnection } from "typeorm";
const app = require("./server");

createConnection()
  .then(async (connection) => {
    app.listen(8080, () => console.log("App is running at port 8080."));
  })
  .catch((error) => console.log(error));
