import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000/";

const socket = io(SOCKET_SERVER_URL);

socket.on("connect", () => {
  console.log("Connected to the WebSocket server");
});

socket.on("notification", (message: string) => {
  console.log("Received notification:", message);
});

const WebSocketService = {
  connect: () => {
    socket.connect();
  },
  disconnect: () => {
    socket.disconnect();
  },
};

export default WebSocketService;
