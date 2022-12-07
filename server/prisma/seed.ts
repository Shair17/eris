// Siempre que se hagan cambios en el schema de prisma
// correr el comando: prisma db push
// para que se ejecuten las validaciones y restricciones

import {PrismaClient} from '@prisma/client';
import {OBJECT_ID_REGEX} from '../src/constants/regex';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  // await prisma.user.deleteMany();

  let start = Date.now();
  const user = await prisma.user.create({
    data: {
      avatar: 'avatar',
      email: `${Math.floor(Math.random() * 10)}@${Math.floor(
        Math.random() * 10,
      )}.com`,
      name: 'Jimmy Morales',
      password: 'mysupersecretpassword',
    },
  });

  console.log('es object id ->', OBJECT_ID_REGEX.test(user.id));

  // const allUsers = await prisma.user.findMany();

  console.log(user);
  console.log('tardó:', Math.floor(Date.now() - start));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
