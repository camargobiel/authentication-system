import { seedDatabase } from '.'
import prisma from '..'
import { Prisma } from '@prisma/client'

export const prepareDatabase = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    await Promise.all(
      Prisma.dmmf.datamodel.models.map(async (model) => {
        await (prisma[model.name as keyof typeof prisma] as any).deleteMany({})
      })
    )
    await seedDatabase()
  }
}