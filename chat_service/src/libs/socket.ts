import { Server as httpServer } from "http";
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, MessageItem, ServerToClientEvents, SocketChannel, SocketData, SocketItem } from "../constants/SocketConstants";
import { sendMessage, setSocketId } from "../controller/socketHandlers";
import { logCyan, logYellow } from "./console";


let io: Server;

export const startSocketServer = async (httpServer: httpServer) => {
    io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
        cors: {
            origin: `${process.env.CORS_ORIGIN}`,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io && logCyan(`Socket server started`);

    io.on(SocketChannel.CONNECTION, (socket: Socket) => {
        logYellow("New client connected with id: ", socket.id);
        socket.on(SocketChannel.DISCONNECT, () => {
            console.log("Client disconnected with id: ", socket.id);
        });

        socket.on(SocketChannel.MESSAGE, (data: MessageItem) => {
            sendMessage(io, data);
        })

        socket.on(SocketChannel.SET_SOCKET_ID, (data: SocketItem) => {
            setSocketId(data);
        });
    });
}