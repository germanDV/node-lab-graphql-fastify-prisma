import argon2 from "argon2"
import prisma from "../../utils/prisma"
import { LoginInput, RegisterUserInput } from "./user_dto"

export async function createUser(input: RegisterUserInput) {
  const password = await argon2.hash(input.password)

  return prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      username: input.username.toLowerCase(),
      password,
    },
  })
}

export async function findUserByEmailOrUsername(input: LoginInput["usernameOrEmail"]) {
  return prisma.user.findFirst({
    where: {
      OR: [{ username: input }, { email: input }],
    },
  })
}

export async function verifyPassword({
  password,
  candidate,
}: {
  password: string
  candidate: string
}) {
  return argon2.verify(password, candidate)
}

export async function followUser({ userId, username }: { userId: string; username: string }) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      following: {
        connect: {
          username,
        },
      },
    },
  })
}

export async function unfollowUser({ userId, username }: { userId: string; username: string }) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      following: {
        disconnect: {
          username,
        },
      },
    },
  })
}

export async function findUsers() {
  return prisma.user.findMany()
}

export async function findUserFollowing(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { following: true },
  })
}

export async function findUserFollowedBy(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { followedBy: true },
  })
}

export async function findUserById(userId: string) {
  return prisma.user.findFirst({ where: { id: userId } })
}
