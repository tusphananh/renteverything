// Class UserMutationResponse implements MutationResponse

import { Field, ObjectType } from "type-graphql";
import Item from "../entities/Item";
import { ErrorResponse } from "./ErrorResponse";
import { ResponseClass } from "./Response";

@ObjectType()
export class ItemResponse extends ResponseClass(Item) {
    code: number;
    success: boolean;
    @Field(() => [ErrorResponse], { nullable: true, defaultValue: [] })
    errors?: ErrorResponse[] | [];
    data?: Item;
}

@ObjectType()
export class ItemsResponse extends ResponseClass(Item) {
    code: number;
    success: boolean;
    @Field(() => [ErrorResponse], { nullable: true, defaultValue: [] })
    errors?: ErrorResponse[] | [];
    @Field(() => [Item])
    data?: Item[];
}