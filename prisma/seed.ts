import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      role: 'USER',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      role: 'ADMIN',
    },
  });

  // Skills
  const skill1 = await prisma.skill.create({
    data: { designation: 'JavaScript' },
  });

  const skill2 = await prisma.skill.create({
    data: { designation: 'TypeScript' },
  });

  const skill3 = await prisma.skill.create({
    data: { designation: 'Python' },
  });

  // CVs
  const cv1 = await prisma.cv.create({
    data: {
      name: 'Alice CV',
      age: 25,
      job: 'Frontend Developer',
      userId: user1.id,
      skills: {
        create: [
          { skillId: skill1.id },
          { skillId: skill2.id },
        ],
      },
    },
  });

  const cv2 = await prisma.cv.create({
    data: {
      name: 'Bob CV',
      age: 30,
      job: 'Backend Developer',
      userId: user2.id,
      skills: {
        create: [
          { skillId: skill2.id },
          { skillId: skill3.id },
        ],
      },
    },
  });

  console.log('Seed data has been added!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
