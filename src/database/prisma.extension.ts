import { PrismaClient } from '@prisma/client';

export const softDeleteExtension = (prisma: PrismaClient) => {
  return prisma.$extends({
    query: {
      $allModels: {
        async findMany({ args, query }) {
          args.where = { ...args.where, deletedAt: null };
          return query(args);
        },
        async findFirst({ args, query }) {
          args.where = { ...args.where, deletedAt: null };
          return query(args);
        },

        async findUnique({ args, query }) {
          const result = await query(args);
          if (result && (result as any).deletedAt) return null;
          return result;
        },
      },
    },
  });
};
