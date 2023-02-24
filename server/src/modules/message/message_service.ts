import { CreateMessageInput } from "./message_dto"
import prisma from "../../utils/prisma"

export function createMessage({ userId, ...input }: CreateMessageInput) {
  return prisma.message.create({
    data: {
      ...input,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
}

export function findMessages() {
  return prisma.message.findMany()
}
