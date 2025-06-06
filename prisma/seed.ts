// import { PrismaClient } from '../src/prisma/generated'

import prisma from '@/database/client'

// const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create default shop
  const shop = await prisma.shop.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Default Casino',
      currency: 'USD',
      percent: 74, // Updated to match CloverStonesNG configuration
      max_win: 100, // Updated to match CloverStonesNG configuration
      is_blocked: false,
    },
  })

  console.log('Created shop:', shop.name)

  // Create game bank
  await prisma.gameBank.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      shop_id: shop.id,
      slots: 0,
      fish: 0,
      bonus: 0,
      little: 0,
    },
  })

  // List of all NG games to create
  const ngGames = [
    'AfricanKingNG',
    'BananasNG',
    'BookOfNileLostChapterNG',
    'BookOfNileNG',
    'BookOfNileRevengeNG',
    'CleosHeartNG',
    'CloverStonesNG',
    'CrazyScientistNG',
    'DiscoFruitsNG',
    'FortuneCashNG',
    'FrostyFruitsNG',
    'GoldenFruitsNG',
    'HitInVegasNG',
    'JackpotSevensNG',
    'Jungle2NG',
    'MMALegendsNG',
    'MagicTreeNG',
    'QuickCashFruitsNG',
    'RedHotChilli7sNG',
    'Royal20FruitsNG',
    'Royal40FruitsNG',
    'SpaceRocksNG',
    'WildBuffaloNG',
    'WolfReelsNG',
    'ZenZenCashNG',
  ]

  // Create NG games
  for (const gameName of ngGames) {
    await prisma.game.upsert({
      where: {
        name_shop_id: {
          name: gameName,
          shop_id: shop.id,
        },
      },
      update: {},
      create: {
        name: gameName,
        title: gameName.replace('NG', ''),
        shop_id: shop.id,
        view: true,
        bet: '1,2,3,4,5,10,15,20,30,40,50,100,200,300',
        denomination: 0.01,
        slotViewState: 'Normal',
        rezerv: 0,
        stat_in: 0,
        stat_out: 0,
      },
    })

    console.log(`Created game: ${gameName}`)
  }

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { username: 'testuser' },
    update: {},
    create: {
      username: 'testuser',
      email: 'test@example.com',
      uid: 1,

      balance: 1000.0,
      // count_balance: 0,
      shop_id: shop.id,
      is_blocked: false,
      status: 'ACTIVE',
      address: 0,
      remember_token: 'test_session_token_123',
    },
  })

  console.log('Created test user:', testUser.username)

  // Create JPG record
  await prisma.jPG.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      shop_id: shop.id,
      percent: 0,
    },
  })

  console.log('Database seed completed successfully!')
  console.log(`Created ${ngGames.length} NG games`)
  console.log('Test user credentials:')
  console.log('  Username: testuser')
  console.log('  Session Token: test_session_token_123')
  console.log('  Balance: $1000.00')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
