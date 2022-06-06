import { Ctx, Arg, Mutation, Resolver, Query, ObjectType, Field, Int } from 'type-graphql'
import {
  Transaction,
  TransactionCreateInput,
  TransactionUpdateInput,
  TransactionWhereUniqueInput,
  IntFieldUpdateOperationsInput,
} from '@teilen/api/generated-types'
import { Context } from '../../types'

@ObjectType()
class MonthlyTransaction {
  @Field(() => Int, { nullable: true })
  year?: number | null
  @Field(() => Int, { nullable: true })
  month?: number | null
  @Field(() => Int, { nullable: true })
  count?: number | null
  @Field(() => Int, { nullable: true })
  sum?: number | null
}

@Resolver()
export default class CustomTransactionResolver {
  @Query(() => MonthlyTransaction)
  async monthlyTransactions(@Ctx() { prisma }: Context): // @Arg('groupId') groupId: String,
  Promise<MonthlyTransaction[]> {
    return prisma.transaction
      .groupBy({
        by: ['month', 'year'],
        // where: {groupId: groupId}
        orderBy: [{ year: 'desc' }, { month: 'desc' }],
        _count: true,
        _sum: {
          amount: true,
        },
      })
      .then((list) =>
        list.map((item) => ({
          year: item.year,
          month: item.month,
          count: item._count,
          sum: item._sum.amount,
        })),
      )
  }

  @Mutation(() => Transaction)
  async createTransactionWithDate(
    @Ctx() ctx: Context,
    @Arg('data') data: TransactionCreateInput,
  ): Promise<Transaction> {
    const date = data.date
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    return ctx.prisma.transaction.create({ data: { ...data, month, year } })
  }

  @Mutation(() => Transaction)
  async updateTransactionWithDate(
    @Ctx() ctx: Context,
    @Arg('data') data: TransactionUpdateInput,
    @Arg('where') where: TransactionWhereUniqueInput,
  ): Promise<Transaction> {
    let transactionData: TransactionUpdateInput = { ...data }
    const date = data.date?.set
    if (date) {
      const month = { set: date.getUTCMonth() + 1 } as IntFieldUpdateOperationsInput
      const year = { set: date.getUTCFullYear() } as IntFieldUpdateOperationsInput
      transactionData = { ...data, month, year }
    }
    return ctx.prisma.transaction.update({ where, data: transactionData })
  }
}
