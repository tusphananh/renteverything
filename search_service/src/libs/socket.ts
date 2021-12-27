import { Server as httpServer } from "http";
import { Server, Socket } from "socket.io";
import SearchInterface from "src/constants/SearchConstants";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketChannel, SocketData } from "../constants/SocketConstants";
import { sendAllSearches, sendSearch } from "../controller/socketHandlers";
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

        /**
         * Load all searches when client connects
         */

        sendAllSearches(socket);

        /**
         * Send search to nearby clients
         */
        socket.on(SocketChannel.SEARCH, (data: SearchInterface) => {
            console.log(data);
            sendSearch(socket, data);
        })

    });
}