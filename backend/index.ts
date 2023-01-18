import express, { Express } from "express";
import "reflect-metadata";
import { AppDataSource } from "./src/configs/DataSourceConfig";
import cors from "cors";
import { User } from "./src/models/User";
import { createServer } from "http";
import { Server } from "socket.io";
import userRoutes from "./src/routes/UserRoutes";
const PORT = "5000";

const app: Express = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: true }));

//socket io
const io: Server = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  app.set("socket", socket);
  socket.on("disconnect", () => {
    console.log("someone disconnected");
  });
});

//routes
app.use("/api/users", userRoutes);

app.get("api/", async function (_req, res) {
  const userRepo = AppDataSource.getRepository(User);
  const allrecords = await userRepo.find();

  // res.send(allrecords);

  let user: User = new User();
  user.PersonID = 11;
  user.PersonName = "tessadsat";
  user.DateOfBirth = new Date();
  user.PersonGender = "tesasdt";
  user.PersonMobileNo = "tasdest";
  user.PersonAddress = "test";
  const userInsert = await userRepo.save(user);
  console.log(allrecords);
  res.send(allrecords);
});



//typeorm connection
AppDataSource.initialize()
  .then(() => {
    console.log("success connected to the database!");
    httpServer.listen(PORT, () => {
      console.log("server running on port 5000!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
