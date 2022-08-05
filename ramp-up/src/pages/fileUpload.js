import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:3077";

export const FileUpload = () => {
  const [fileSelected, setFileSelected] = useState();
  const socket = io(ENDPOINT);
  const [notification, setNotification] = useState([]);

  const notificationListner = (recievingNotification) => {
    setNotification([...notification, recievingNotification]);
  };
//handling socket server event
  useEffect(() => {

    socket.on("fileUpload", notificationListner);
    
  }, [notificationListner]);

  const changeHandler = (event) => {
    setFileSelected(event.target.files[0]);
  };


  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", fileSelected);

    socket.emit("fileUpload", "File Uploaded");
    
    console.log(notification)
    //uploading File via POST method
    try {
      fetch("http://localhost:4000/file?", {
        mode: "no-cors",
        method: "POST",
        body: formData,
      });
       
    } catch (e) {
      console.log(e);
      alert("some error occured while uploading file");
    }
  };
  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" name="file" onChange={changeHandler} />

      {fileSelected ? (
        <div>
          <p>Filename: {fileSelected.name}</p>
          <p>Filetype: {fileSelected.type}</p>
          <p>Size in bytes: {fileSelected.size}</p>
          <p>
            lastModifiedDate:{" "}
            {fileSelected.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleFileUpload}>Submit</button>
      </div>
    </div>
  );
};
