import { hashSync } from 'bcrypt'
import prisma from '..'

export const seedDatabase = async (): Promise<void> => {
  await Promise.all(
    [
      prisma.account.createMany({
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
      }),
      prisma.product.createMany({
        data: [
          {
            id: '515be17a-6b6c-414a-807f-dc216414d24c',
            name: 'Chad Miles',
            value: 200
          },
          {
            id: '4e9be197-40ac-45c3-9cb3-78eed6657446',
            name: 'Mattie Hudson',
            value: 100
          },
          {
            id: '19b1261e-267a-42ed-a802-72b87c830354',
            name: 'Martin Davidson',
            value: 50
          },
          {
            id: '272ac411-c61f-455b-b644-d600a21a799a',
            name: 'Ryan Paul',
            value: 10
          }
        ]
      })
    ]
  )
}
