// Class UserMutationResponse implements MutationResponse

import { Field, ObjectType } from "type-graphql";
import { Response } from "./Response";
import Item from "../entities/Item";

@ObjectType()
export class ItemResponse extends Response(Item) {
    code: number;
    success: boolean;
    message: string;
    data?: Item;
}

@ObjectType()
export class ItemsResponse extends Response(Item) {
    code: number;
    success: boolean;
    message: string;

    @Field(() => [Item])
    data?: Item[];
}