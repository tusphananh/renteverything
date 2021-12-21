// Class UserMutationResponse implements MutationResponse

import { Field, ObjectType } from "type-graphql";
import { Response } from "./Response";
import Item from "../entities/Item";
import { ErrorResponse } from "./ErrorResponse";

@ObjectType()
export class ItemResponse extends Response(Item) {
    code: number;
    success: boolean;
    @Field(() => [ErrorResponse], { nullable: true, defaultValue: [] })
    errors?: ErrorResponse[] | [];
    data?: Item;
}

@ObjectType()
export class ItemsResponse extends Response(Item) {
    code: number;
    success: boolean;
    @Field(() => [ErrorResponse], { nullable: true, defaultValue: [] })
    errors?: ErrorResponse[] | [];
    @Field(() => [Item])
    data?: Item[];
}