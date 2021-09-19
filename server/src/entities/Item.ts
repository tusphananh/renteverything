import { Field, Float, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  @Column({type: "float" })
  price!: number;

  // imageUrl is nullable
  @Field() 
  @Column({ nullable: true })
  imageUrl!: string;

  @Field()
  @Column({ nullable: false, default: 1, type: "int" })
  quantity!: number;

  @Field()
  @Column()
  userId!: number;
}
