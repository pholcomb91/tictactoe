import React, { useEffect } from "react";
import Header from "./components/header";
import Game from "./components/game";
import Chat from "./components/chat";
import { io } from "socket.io-client";
// const styles = {
//   page: {
//     backgound: '#282c34',
//     color: '#61dafb'
//   }
// }


function App() {
  const connect = () => {
    const socket = io('http://localhost/3000');
    // client must run on different local address from server
    socket.on("connect", () => {
      // change custome event to whatever server side event is named
      socket.emit("***custom_event***", { name: 'testData' });
    });
  };
  useEffect(() => {
    connect();
  }, []);
  return (
    <div>
      <Header />
      <Game />
      <Chat />
    </div>
  );
}

export default App;
