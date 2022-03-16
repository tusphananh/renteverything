import { Field, Float, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@ObjectType()
@Entity()
export default class Item extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => Float)
  @Column({ type: "float" })
  price!: number;

  @Field(() => Float)
  @Column({ type: "float" })
  realValue!: number;

  @JoinColumn({ name: "userId" })
  @ManyToOne(() => User, user => user.items) owner!: User;
}
