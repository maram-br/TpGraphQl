import { PrismaClient } from '@prisma/client';
import { Context } from "../context";

const prisma = new PrismaClient();

export const Mutation = {
  // Create a CV
  createCv: async (_parent: any, { input }: { input: CreateCvInput }, { pubSub }: Context) => {
    const { name, age, job, userId, skillIds } = input;

    // Create the new CV
    const cv = await prisma.cv.create({
      data: {
        name,
        age,
        job,
        userId,
        skills: {
          connect: skillIds.map((id: number) => ({ id }))
        }
      },
    });

    // Publish to subscription after creation
    pubSub.publish("CV_ADDED", { cvAdded: cv });

    return cv;
  },

  // Update a CV
  updateCv: async (_parent: any, { input }: { input: UpdateCvInput }, { pubSub }: Context) => {
    const { id, name, age, job, userId, skillIds } = input;

    const cv = await prisma.cv.update({
      where: { id },
      data: {
        name,
        age,
        job,
        userId,
        skills: {
          set: skillIds.map((id: number) => ({ id })),
        },
      },
    });

    pubSub.publish("CV_UPDATED", { cvUpdated: cv });

    return cv;
  },

  // Remove a CV
  removeCv: async (_parent: any, { id }: { id: number }, { pubSub }: Context) => {
    const cv = await prisma.cv.delete({
      where: { id },
    });

    pubSub.publish("CV_DELETED", { cvDeleted: cv });

    return true;
  }
};
