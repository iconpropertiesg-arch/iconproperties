const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'iconproperties@gmail.com' },
    update: {},
    create: {
      email: 'iconproperties@gmail.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  });

  console.log('✅ Admin user created:', admin.email);
  console.log('🔑 Default password: admin123');
  console.log('⚠️  Please change the password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

