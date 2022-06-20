import { Field, ID, ObjectType } from "type-graphql";
import {
    BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn
} from "typeorm";
import Message from "./Message";

@ObjectType()
@Entity()
export default class Chat extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    // Decending order
    @Field(() => [Message])
    @OneToMany(() => Message, message => message.chat, {
        cascade: true,
        eager: true,
    })
    messages!: Message[];

    @Field()
    @Column()
    title!: string;

    @Field()
    @CreateDateColumn()
    createdAt!: Date;

}
