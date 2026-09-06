import { PrismaClient } from './src/generated/prisma/index.js';
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const dests = await prisma.destination.findMany({ take: 3 });
    console.log("--- Destinations ---");
    console.log(JSON.stringify(dests, null, 2));

    if (dests.length === 0) {
      console.log("Database is completely empty! No destinations found.");
    }
  } catch (e) {
    console.error("DB Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
