import { Root, Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Authorized } from "type-graphql"
import { FollowUserInput, LoginInput, RegisterUserInput, User, UserFollowers } from "./user_dto"
import {
  createUser,
  findUserByEmailOrUsername,
  findUserFollowedBy,
  findUserFollowing,
  findUsers,
  followUser,
  unfollowUser,
  verifyPassword,
} from "./user_service"
import { Context } from "../../utils/create_server"
import { ApolloError } from "apollo-server-core"

@Resolver(() => User)
class UserResolver {
  @Mutation(() => User)
  async register(@Arg("input") input: RegisterUserInput) {
    try {
      const user = await createUser(input)
      return user
    } catch (err) {
      // check if email or username is not unique
      throw err
    }
  }

  @Authorized()
  @Query(() => User)
  me(@Ctx() context: Context) {
    return context.user
  }

  @Query(() => [User])
  async users() {
    return findUsers()
  }

  @Mutation(() => String)
  async login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    const user = await findUserByEmailOrUsername(input.usernameOrEmail.toLowerCase())
    if (!user) throw new ApolloError("Invalid credentials")

    const isValid = await verifyPassword({
      password: user.password,
      candidate: input.password,
    })

    if (!isValid) throw new ApolloError("Invalid credentials")

    const token = await context.reply?.jwtSign({
      id: user.id,
      username: user.username,
      email: user.email,
    })

    if (!token) throw new ApolloError("Error signing token")

    context.reply?.setCookie("token", token, {
      domain: "localhost",
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: false,
    })

    return token
  }

  @Authorized()
  @Mutation(() => User)
  async followUser(
    @Arg("input", { validate: false }) input: FollowUserInput,
    @Ctx() context: Context
  ) {
    try {
      const result = await followUser({ ...input, userId: context.user?.id! })
      return result
    } catch (err: any) {
      throw new ApolloError(err)
    }
  }

  @Authorized()
  @Mutation(() => User)
  async unfollowUser(
    @Arg("input", { validate: false }) input: FollowUserInput,
    @Ctx() context: Context
  ) {
    try {
      const result = await unfollowUser({ ...input, userId: context.user?.id! })
      return result
    } catch (err: any) {
      throw new ApolloError(err)
    }
  }

  @Authorized()
  @FieldResolver(() => UserFollowers)
  async followers(@Root() user: User) {
    const data = await findUserFollowedBy(user.id)

    return {
      count: data?.followedBy.length,
      items: data?.followedBy,
    }
  }

  @Authorized()
  @FieldResolver(() => UserFollowers)
  async following(@Root() user: User) {
    const data = await findUserFollowing(user.id)

    return {
      count: data?.following.length,
      items: data?.following,
    }
  }
}

export default UserResolver
