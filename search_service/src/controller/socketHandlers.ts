import { Server, Socket } from "socket.io";
import { SearchItem, SearchResult } from "../constants/SearchConstants";
import { SocketChannel } from "../constants/SocketConstants";
import Search from "../models/Search";

export const sendSearch = (socket: Socket, data: SearchItem) => {

    Search.create(data);
    socket.broadcast.emit(SocketChannel.NEARBY, data);
}

export const sendAllSearches = (io: Server, socket: Socket) => {
    Search.getAll().then((searches: any) => {
        searches.forEach((search: any) => {
            Search.get(search).then((search: any) => {
                const rs: SearchItem = search
                // console.log("Send all search to: ", socket.id);
                io.to(socket.id).emit(SocketChannel.NEARBY, rs);
            });
        })
    });
}

export const removeSearch = (socket: Socket, data: SearchItem) => {
    Search.remove(data.id);
    socket.broadcast.emit(SocketChannel.CANCEL, data);
}

export const sendResult = (socket: Socket, data: SearchResult) => {
    Search.get(data.searchId).then((search: any) => {
        try {
            // console.log(search);
            socket.to(search.socketId).emit(SocketChannel.RESULT, data);
        } catch (error) {
            console.log(error);
        }
    });
}

export const removeSearchBySocketId = (socketId: string, io: Server) => {
    Search.getAll().then((searches: any) => {
        searches.forEach((search: any) => {
            Search.get(search).then((search: any) => {
                // console.log(search);
                if (search.socketId === socketId) {
                    // console.log("Remove search: ", search);
                    Search.remove(search.id);
                    io.emit(SocketChannel.CANCEL, search);
                }
            });
        })
    });
}