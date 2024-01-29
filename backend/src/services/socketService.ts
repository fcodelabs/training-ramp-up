import { Server, Socket } from "socket.io";
import * as http from "http";
let io: Server;

export const userSockets = new Map<string, string>();

export const initializeSocketIO = async (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("authenticate", (userId) => {
      userSockets.set(userId, socket.id);
    });
    socket.on("messageReceived", (message) => {
      console.log(userSockets);
      console.log("Received confirmation from client:", message);
    });
  });

  io.on("privateMessage", (message) => {
    console.log("Received private message notified:", message);
  });

  io.on("disconnect", () => {
    console.log("User disconnected");
  });
};

export const getSocketInstance = (): Server => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized yet");
  }
  return io;
};
