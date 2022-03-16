import { Server as httpServer } from "http";
import { Server, Socket } from "socket.io";
import { SearchItem, SearchResult } from "src/constants/SearchConstants";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketChannel, SocketData } from "../constants/SocketConstants";
import { removeSearch, removeSearchBySocketId, sendAllSearches, sendResult, sendSearch } from "../controller/socketHandlers";
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
            removeSearchBySocketId(socket.id, io);
        });

        /**
         * Load all searches when client connects
         */

        sendAllSearches(io, socket);

        /**
         * Send search to nearby clients
         */
        socket.on(SocketChannel.SEARCH, (data: SearchItem) => {
            // console.log(data);
            sendSearch(socket, data);
        })

        socket.on(SocketChannel.CANCEL, (data: SearchItem) => {
            // console.log(data);
            removeSearch(socket, data);
        })

        socket.on(SocketChannel.RESULT, (data: SearchResult) => {
            sendResult(socket, data);
        })

    });
}