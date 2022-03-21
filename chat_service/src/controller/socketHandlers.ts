import { Server } from "socket.io";
import { MessageItem, SocketChannel, SocketItem } from "../constants/SocketConstants";
import { addRedisValue, getRedisValue } from "../libs/redis";

export const sendMessage = (io: Server, data: MessageItem) => {
    getRedisValue(data.toUserId).then((socketId: any) => {
        io.to(socketId).emit(SocketChannel.MESSAGE, data.message);
    });
}
export const setSocketId = (data: SocketItem) => {
    addRedisValue(data.userId, data.socketId);
}