import { Context } from "../context";

export const Query = {
  cvs: async (_parent: any, _args: any, { prisma }: Context) => {
    return prisma.cv.findMany();
  },

  cv: async (_parent: any, { id }: { id: string }, { prisma }: Context) => {
    return prisma.cv.findUnique({
      where: { id: Number(id) },
    });
  },
};
