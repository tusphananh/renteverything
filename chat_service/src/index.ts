import { createServer } from "http";
import { Server, Socket } from "socket.io";
require('dotenv').config();

const PORT = process.env.PORT;
const httpServer = createServer();

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: {
        origin: `${process.env.CORS_ORIGIN}`,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket: Socket) => {
    console.log("New client connected with id: ", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected with id: ", socket.id);
    });
});





httpServer.listen(PORT, () => {
    console.log(`Search service listening on port ${PORT}`);
    console.log(`CORS origin: ${process.env.CORS_ORIGIN}`);
});