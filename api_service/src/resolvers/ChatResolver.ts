import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Chat from "../entities/Chat";
import Message from "../entities/Message";
import User from "../entities/User";
import { checkAuth } from "../middlewares/checkAuth";
import { Context } from "../types/Context";
import { ErrorResponse } from "../types/ErrorResponse";
import { MessageResponse } from "../types/MessageResponse";

const serverErrors: ErrorResponse = {
    field: "server",
    message: "Server error",
};
@Resolver()
export class ChatResolver {
    /**
     * add message to chatId
     * @param {number} chatId
     */

    @Mutation(() => MessageResponse, { nullable: true })
    @UseMiddleware(checkAuth)
    async addMessage(
        @Arg("id") id: string,
        @Arg("chatId") chatId: number,
        @Arg("text") text: string,
        @Ctx() { req }: Context
    ): Promise<MessageResponse> {
        try {
            const owner = await User.findOne({
                id: req.session.userId,
            });

            if (!owner) {
                return {
                    code: 404,
                    success: false,
                    errors: [{
                        field: "user",
                        message: "User not found",
                    }],
                };
            }

            const chat = await Chat.findOne({
                id: chatId,
            });

            if (!chat) {
                return {
                    code: 404,
                    success: false,
                    errors: [{
                        field: "chat",
                        message: "Chat not found",
                    }],
                };
            }

            const message = await Message.create({
                id,
                user: owner,
                text,
                chat
            }).save();

            const rs = {
                code: 200,
                success: true,
                data: message,
            }

            return rs;

        } catch (error) {
            console.log(error);
            const rs = {
                code: 500,
                success: false,
                errors: [serverErrors]
            }

            return rs;
        }
    }

}
