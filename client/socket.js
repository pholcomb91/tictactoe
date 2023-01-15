import { Server } from "socket.io";
import { useSocketServer } from "socket-controllers";

const HttpServer= (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connect", (socket) => {
        
    })

    useSocketServer(io, { controllers: [__dirname + "/src/api/index.js"] })
    return io;
}

export default HttpServer;