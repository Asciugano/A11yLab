import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

// const prisma =
//   new PrismaClient()
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     adapter: new PrismaPG({ connectionString: process.env.DATABASE_URL }),
//   });

if (process.env.NEXT_ENV === "dev") globalForPrisma.prisma = prisma;

// istanza di prisma per utilizzare il DB
export { prisma };
