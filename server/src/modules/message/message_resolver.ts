import {
  Authorized,
  Ctx,
  Query,
  Arg,
  Mutation,
  Resolver,
  FieldResolver,
  Root,
  PubSub,
  PubSubEngine,
  Subscription,
} from "type-graphql"
import { Context } from "../../utils/create_server"
import { findUserById } from "../user/user_service"
import { CreateMessageInput, Message } from "./message_dto"
import { createMessage, findMessages } from "./message_service"

const topics = {
  NEW_MESSAGE: "NEW_MESSAGE",
}

@Resolver(Message)
class MessageResolver {
  @Authorized()
  @Mutation(() => Message)
  async createMessage(
    @Arg("input") input: CreateMessageInput,
    @Ctx() context: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    const result = await createMessage({ ...input, userId: context.user?.id! })
    await pubSub.publish(topics.NEW_MESSAGE, result)
    return result
  }

  @FieldResolver()
  async user(@Root() message: Message) {
    return findUserById(message.userId)
  }

  @Query(() => [Message])
  async messages() {
    return findMessages()
  }

  @Subscription(() => Message, { topics: topics.NEW_MESSAGE })
  newMessage(@Root() message: Message): Message {
    return message
  }
}

export default MessageResolver
