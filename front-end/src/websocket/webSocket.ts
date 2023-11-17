import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000/";

const socket = io(SOCKET_SERVER_URL);

const WebSocketService = {
  connect: () => {
    socket.connect();
  },
  disconnect: () => {
    socket.disconnect();
  },
  onNotification: <T>(callback: (message: T) => void): void => {
    socket.on("Notification", callback);
  },
  offNotification: <T>(callback: (message: T) => void): void => {
    socket.off("Notification", callback);
  },
};

export default WebSocketService;
