import { PrismaClient } from '@prisma/client';
import { createPubSub } from "graphql-yoga";

const prisma = new PrismaClient();

type Events = {
  CV_ADDED: [{ cvAdded: any }];
  CV_UPDATED: [{ cvUpdated: any }];
  CV_DELETED: [{ cvDeleted: any }];
};

export const pubSub = createPubSub<Events>();

export interface Context {
  prisma: PrismaClient;
  pubSub: typeof pubSub;
}

export const context: Context = {
  prisma,
  pubSub,
};
