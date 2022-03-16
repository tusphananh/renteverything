import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ActivityStatus } from "../types/Status";
import Chat from "./Chat";
import User from "./User";

@ObjectType()
@Entity()
export default class Activity extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    id!: string;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    itemName!: string;

    @Field()
    @Column()
    itemDescription!: string;

    @Field()
    @Column({ type: "float" })
    itemPrice!: number;

    @Field()
    @Column({ type: "float" })
    itemRealValue!: number;

    @Field()
    @Column({ type: "float" })
    totalPrice!: number;

    @Field()
    @Column()
    duration!: number;

    @Field()
    @Column({ type: "float" })
    distance!: number;

    @Field()
    @Column()
    status!: ActivityStatus

    @Field()
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

    @Field(() => User)
    @JoinColumn({ name: "providerId" })
    @ManyToOne(() => User, user => user.provideActivities, {
        cascade: true,
        eager: true,
    }) provider!: User;

    @Field(() => User)
    @JoinColumn({ name: "renterId" })
    @ManyToOne(() => User, user => user.rentActivities, {
        cascade: true,
        eager: true,
    }) renter!: User;

    @Field(() => Chat)
    @JoinColumn()
    @OneToOne(() => Chat, {
        cascade: true,
        eager: true,
    }) chat!: Chat;
}
