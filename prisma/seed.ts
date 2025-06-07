import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = ['patient', 'doctor', 'admin'];

  for (const roleName of roles) {
    const existingRole = await prisma.role.findUnique({ where: { name: roleName } });
    if (!existingRole) {
      await prisma.role.create({ data: { name: roleName } });
      console.log(`Role ${roleName} created.`);
    } else {
      console.log(`Role ${roleName} already exists.`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
