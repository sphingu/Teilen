import { Ctx, Arg, Resolver, Query, Mutation } from 'type-graphql'
import { User } from '@teilen/api/generated-types'
import { Context } from '../types'

@Resolver()
export default class CustomUserResolver {
  @Query(() => User)
  async currentUser(@Ctx() ctx: Context): Promise<User | null> {
    return ctx.prisma.user.findUnique({ where: { id: ctx.user.id } })
  }

  @Query(() => [User])
  async commonUsers(@Ctx() ctx: Context): Promise<User[] | null> {
    return ctx.prisma.user.findMany({
      where: { groups: { some: { users: { some: { id: ctx.user.id } } } } },
    })
  }

  @Mutation(() => User)
  async inviteUser(@Ctx() ctx: Context, @Arg('email') email: string): Promise<User> {
    const user = await ctx.prisma.user.findUnique({
      where: { email },
    })

    if (user) {
      return user
    }

    return ctx.prisma.user.create({
      data: {
        email: email,
      },
    })
  }
}
