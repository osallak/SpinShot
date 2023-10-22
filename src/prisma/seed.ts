import { faker } from '@faker-js/faker';
import { User } from 'src/types';
import { PrismaClient, UserStatus } from '@prisma/client';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
const fs = require('fs');

const prisma = new PrismaClient();
console.log('Seeding...');

const initUserLogs: () => any = () => {
  return {
    victories: faker.number.int({ min: 0, max: 1000 }),
    defeats: faker.number.int({ min: 0, max: 1000 }),
    level: faker.number.float({ min: 0.0, max: 10 }),
  };
}

// const createFriendships = async (user: User, users: User[]): Promise<void> => {

  
// }

const achievements = [
  { name: 'SPINSHOT ROOKIE', description: 'WIN YOUR FIRST MATCH' },
  {
    name: 'SPINSHOT MARATHON',
    description: 'PLAY A TOTAL OF 10 ONLINE MATCHES',
  },
  {
    name: 'UNTOUCHABLE',
    description: 'WIN A MATCH WITHOUT YOUR OPPONENT SCORING A SINGLE POINT',
  },
  { name: 'AMBASSADOR', description: 'PLAY THE FIRST MATCH WITH YOUR FRIEND' },
];
async function initAcheivements(user: any): Promise<any> {
  await prisma.achievement.createMany({
    data: [
      {
        name: achievements[0].name,
        description: achievements[0].description,
      },
      {
        name: achievements[1].name,
        description: achievements[1].description,
      },
      {
        name: achievements[2].name,
        description: achievements[2].description,
      },
      {
        name: achievements[3].name,
        description: achievements[3].description,
      },
    ],
  });
  const achievs = await prisma.achievement.findMany();
  if (!achievs) throw new InternalServerErrorException();

  return await prisma.haveAchievement.createMany({
    data: [
      {
        userId: user.id,
        achievementId: achievs[0].id,
        level: faker.number.float({ min: 0.0, max: 1 }),
      },
      {
        userId: user.id,
        achievementId: achievs[1].id,
        level: faker.number.float({ min: 0.0, max: 1 }),
      },
      {
        userId: user.id,
        achievementId: achievs[2].id,
        level: faker.number.float({ min: 0.0, max: 1 }),
      },
      {
        userId: user.id,
        achievementId: achievs[3].id,
        level: faker.number.float({ min: 0.0, max: 1 }),
      },
    ],
  });
}

const createRandomGame = async (user: User, users: User[]): Promise<void> => {
  const opponentId =
    users[faker.number.int({ min: 0, max: users.length - 1 })].id;

  await prisma.game.create({
    data: {
      userId: user.id,
      opponentId: opponentId,
      map: faker.helpers.arrayElement(['normal', 'hard', 'expert']),
      History: {
        create: {
          userScore: faker.number.int({ min: 0, max: 100 }),
          opponentScore: faker.number.int({ min: 0, max: 100 }),
          userId: user.id,
          opponentId,
        },
      },
      accepted: faker.datatype.boolean({
        probability: 0.5,
      }),
    },
  });
};

const createRandomUser = async (): Promise<any> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123123', salt);
  const user = await prisma.user.create({
    data: {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: hashedPassword,
      avatar: faker.image.avatar(),
      country: faker.location.country(),
      twoFactorAuth: false,
      mailVerified: true,
      is42User: false,
      status: UserStatus.ONLINE,
      logs: {
        create: initUserLogs(),
      },
    },
  });
  await initAcheivements(user);
  // await createRandomGame(user, await prisma.user.findMany());
  return user;
};

export async function seed(rounds: number = 5): Promise<void> {
  for (let i = 0; i < rounds; i++) {
    let user = await createRandomUser();
    console.log(user);
  }
}

seed()
  .then(() => {
    console.log('Seeding finished.');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
