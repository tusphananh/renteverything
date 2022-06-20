import { Field, ID, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne, PrimaryColumn
} from "typeorm";
import Chat from "./Chat";
import User from "./User";

@ObjectType()
@Entity()
export default class Message extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    id!: string;

    @Field()
    @CreateDateColumn()
    createdAt!: Date;

    @Field()
    @Column()
    text!: string;

    @JoinColumn({ name: "chatId" })
    @ManyToOne(() => Chat, chat => chat.messages)
    chat!: Chat;

    @Field()
    @Column()
    chatId!: number;

    @Field(() => User)
    @JoinColumn({ name: "userId" })
    @ManyToOne(() => User, user => user.messages, {
        cascade: true,
        eager: true,
    })
    user!: User;

}
