// Class UserMutationResponse implements MutationResponse

import { Field, ObjectType } from "type-graphql";
import Activity from "../entities/Activity";
import { ErrorResponse } from "./ErrorResponse";
import { ResponseClass } from "./Response";



@ObjectType()
export class ActivityResponse extends ResponseClass(Activity) {
    code: number;
    success: boolean;
    @Field(() => [ErrorResponse], { nullable: true, defaultValue: [] })
    errors?: ErrorResponse[] | [];
    @Field(() => Activity)
    data?: Activity;
}

@ObjectType()
export class ActivitiesResponse extends ResponseClass(Activity) {
    code: number;
    success: boolean;
    @Field(() => [ErrorResponse], { nullable: true, defaultValue: [] })
    errors?: ErrorResponse[] | [];
    @Field(() => [Activity])
    data?: Activity[];
}