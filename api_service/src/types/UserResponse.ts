// Class UserMutationResponse implements MutationResponse

import User from "../entities/User";
import { Field, ObjectType } from "type-graphql";
import { ResponseClass } from "./Response";
import { ErrorResponse } from "./ErrorResponse";

@ObjectType()
export class UserResponse extends ResponseClass(User) {
  code: number;
  success: boolean;
  @Field(() => [ErrorResponse], { nullable: true, defaultValue: [] })
  errors?: ErrorResponse[] | [];
  data?: User;
}

