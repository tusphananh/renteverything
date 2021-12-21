// MutationResponse abstract class

import { ClassType, Field, ObjectType } from "type-graphql";
import { ErrorResponse } from "./ErrorResponse";

export function Response<TData>(TDataClass: ClassType<TData>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class ResponseClass {
    @Field()
    code: number;
    @Field()
    success: boolean;
    @Field(() => [ErrorResponse], { nullable: true, defaultValue: [] })
    errors?: ErrorResponse[] | [];
    @Field(() => TDataClass || [TDataClass], { nullable: true })
    data?: TData | TData[];
  }
  return ResponseClass;
}
