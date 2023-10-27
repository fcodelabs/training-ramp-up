import React from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("message", (data: string) => {
      toast("🦄 " + data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      theme="light"
    />
  );
};

export default Notification;
