// Class UserMutationResponse implements MutationResponse

import { Field, ObjectType } from "type-graphql";
import Message from "../entities/Message";
import { ErrorResponse } from "./ErrorResponse";
import { ResponseClass } from "./Response";

@ObjectType()
export class MessageResponse extends ResponseClass(Message) {
    code: number;
    success: boolean;
    @Field(() => [ErrorResponse], { nullable: true, defaultValue: [] })
    errors?: ErrorResponse[] | [];
    data?: Message;
}
