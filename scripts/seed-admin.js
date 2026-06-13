const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const rawPassword = process.env.ADMIN_PASSWORD

  if (!email || !rawPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local')
  }

  const password = await bcrypt.hash(rawPassword, 10)
  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { password },
    create: { email, password, name: 'Admin' },
  })
  console.log('Admin user ready:', user.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
