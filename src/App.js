import React from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";

function App() {
  //Initialize the connection to the server
  let socket1 = socketIOClient("192.168.100.232");
  let socket2 = socketIOClient("192.168.100.232");
  //Listen to event hi from the server
  socket1.on("hi", function(data) {
    console.log("suck my dick");
  });
  //Send to the server with event "restaurant room"

  function join() {
    socket1.emit("join", {
      id: "2"
    });
    socket2.emit("join", {
      id: "2"
    });
  }
  function sendShit() {
    socket2.emit("hi", {
      id: "2"
    });
  }
  return (
    <div className="App">
      <button onClick={() => join()}>Join room</button>
      <button onClick={() => sendShit()}>Send shit</button>
    </div>
  );
}

export default App;
