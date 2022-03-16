import { Server } from "socket.io";
import { addRedisValue, getRedisValue } from "../libs/redis";
import { MessageItem, SocketChannel, SocketItem } from "../constants/SocketConstants";

export const sendMessage = (io: Server, data: MessageItem) => {
    getRedisValue(data.toUserId).then((socketId: any) => {
        io.to(socketId).emit(SocketChannel.MESSAGE, data.message);
    });
}
export const setSocketId = (data: SocketItem) => {
    addRedisValue(data.userId, data.socketId);
}