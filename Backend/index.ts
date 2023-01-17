import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("This is a test web page!");
});

app.listen(port, () => {
  console.log("The application is listening on port 3000!");
});
