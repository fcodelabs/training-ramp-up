import React, { useEffect } from "react";
import styled from "styled-components";
import Appbar from "../../components/Appbar/Appbar";
import Table from "./Table/Table";
import { Socket, io } from "socket.io-client";

export const HomeWarpper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-top: 105px;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  useEffect(() => {
    const socket: Socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      const userId = "123456789";
      socket.emit("authenticate", userId);
    });

    socket.on("privateMessage", (message) => {
      console.log("Received private message:", message);

      // Emit a confirmation to the server
      socket.emit("messageReceived", "Message received successfully");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <HomeWarpper>
      <Appbar />
      <ContainerWrapper>
        <Table />
      </ContainerWrapper>
    </HomeWarpper>
  );
}
