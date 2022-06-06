import { Ctx, Resolver, Query } from 'type-graphql'
import { Group } from '@teilen/api/generated-types'
import { Context } from '../../types/index'

@Resolver()
export default class CustomGroupResolver {
  @Query(() => Group)
  async currentUserGroups(@Ctx() { user, prisma }: Context): Promise<Group[]> {
    return prisma.group.findMany({
      where: { users: { some: { id: user.id } } },
    })
  }
}
