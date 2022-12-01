import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res, next) => {
  res.status(200).json({
    data: "abcdefghijklmnopqrstuvwxyz",
  });
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
