import { Length } from "class-validator"
import { InputType, Field, ObjectType, ID } from "type-graphql"
import { User } from "../user/user_dto"

@InputType()
export class CreateMessageInput {
  @Length(6, 280)
  @Field(() => String, { nullable: false })
  body: string

  userId: string
}

@ObjectType()
export class Message {
  @Field(() => ID, { nullable: false })
  id: string

  @Field(() => User, { nullable: false })
  user: User

  @Field(() => ID, { nullable: false })
  userId: string

  @Field(() => ID, { nullable: false })
  body: string

  @Field()
  createdAt: string

  @Field()
  updatedAt: string
}
