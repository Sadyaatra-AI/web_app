import 'dotenv/config';
import { getPrisma, seedDatabaseIfEmpty } from './src/lib/db';

const db = getPrisma();

console.log('Before:');

console.log(
  await db.destination.findMany({
    select: {
      id: true,
      name: true,
    },
  })
);

await db.destination.deleteMany({});

console.log('Destinations deleted.');

await seedDatabaseIfEmpty();

console.log('After:');

console.log(
  await db.destination.findMany({
    select: {
      id: true,
      name: true,
    },
  })
);

await db.$disconnect();
