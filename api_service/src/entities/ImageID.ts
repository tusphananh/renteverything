import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class ImageID {
    @Field()
    frontSide!: string;

    @Field()
    backSide!: string;
}
