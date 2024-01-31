import { hashSync } from 'bcrypt'
import prisma from '..'

export const seedDatabase = async (): Promise<void> => {
  await prisma.account.createMany({
    data: [
      {
        id: '04ee5343-0dac-405f-95f1-ff9f60055805',
        name: 'Chester Williams',
        email: 'geosumel@zugudsew.fk',
        password: hashSync('123456', 10)
      },
      {
        id: 'd35378b5-8ee1-4537-93ce-064586f6a456',
        name: 'Loretta Rivera',
        email: 'zezucu@wajim.sb',
        password: 'jWP5nQdt8jQz'
      }
    ]
  })
}
