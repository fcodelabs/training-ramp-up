import { Server } from "socket.io";
import * as http from "http";
let io: Server;


export const initializeSocketIO = async (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    },
  });

  io.on("connection", (socket) => {

    socket.on("userDisconnected", () => {
      console.log("userDisconnected");
    })
  });

};

export const getSocketInstance = (): Server => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized yet");
  }
  return io;
};
