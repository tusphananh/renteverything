import { Socket } from "socket.io";
import SearchInterface from "../constants/SearchConstants";
import { SocketChannel } from "../constants/SocketConstants";
import Search from "../models/Search";

export const sendSearch = (socket: Socket, data: SearchInterface) => {

    Search.create(data);
    socket.broadcast.emit(SocketChannel.NEARBY, data);
}

export const sendAllSearches = (socket: Socket) => {
    Search.getAll().then((searches: any) => {
        searches.forEach((search: any) => {
            Search.get(search).then((search: any) => {
                const rs: SearchInterface = search
                // console.log(rs)
                socket.emit(SocketChannel.NEARBY, rs);
            });
        })
    });
}