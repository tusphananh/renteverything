// Class UserMutationResponse implements MutationResponse


import { Field, ObjectType } from "type-graphql";
import ImageID from "../entities/ImageID";
import { ErrorResponse } from "./ErrorResponse";

@ObjectType()
export class ImageIDResponse {
    @Field(() => Number)
    code: number;
    @Field(() => Boolean)
    success: boolean;
    @Field(() => [ErrorResponse], { nullable: true, defaultValue: [] })
    errors?: ErrorResponse[] | [];
    @Field(() => ImageID, { nullable: true })
    data?: ImageID;
}


