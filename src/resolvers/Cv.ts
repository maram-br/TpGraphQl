import { Context } from "../context";

export const Cv = {
  user: (cv: any, _args: any, { prisma }: Context) => {
    return prisma.user.findUnique({
      where: { id: cv.userId },
    });
  },

  skills: (cv: any, _args: any, { prisma }: Context) => {
    return prisma.cvSkill.findMany({
      where: { cvId: cv.id },
      include: { skill: true },
    }).then(cvSkills => cvSkills.map(cs => cs.skill));
  },
};
