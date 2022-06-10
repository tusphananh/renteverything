import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Activity from "./Activity";
import Item from "./Item";
import Message from "./Message";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  phone!: string;

  @Column()
  password!: string;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column({ default: 0.0, type: "float" })
  balance!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Activity, activity => activity.renter) provideActivities!: Activity[];

  @OneToMany(() => Activity, activity => activity.provider) rentActivities!: Activity[];

  @Field(() => [Item])
  @OneToMany(() => Item, item => item.owner, {
    cascade: true,
    eager: true,
  }) items!: Item[];

  @OneToMany(() => Message, message => message.user)
  messages!: Message[];

  @Column({ nullable: true })
  frontIdImageFilePath?: string;

  @Column({ nullable: true })
  backIdImageFilePath?: string;

  @Field()
  @Column({ default: false })
  isVerified!: boolean;
}
