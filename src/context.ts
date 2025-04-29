import { PrismaClient } from '@prisma/client';
import { createPubSub } from 'graphql-yoga';

import { DB } from "./data"; 


const prisma = new PrismaClient();

type Events = {
  CV_ADDED: [{ cvAdded: any }];
  CV_UPDATED: [{ cvUpdated: any }];
  CV_DELETED: [{ cvDeleted: any }];
};

const pubSub = createPubSub<Events>();

export interface Context {
  prisma: PrismaClient;
  
  users: typeof DB.users;
  skills: typeof DB.skills;
  cvs: typeof DB.cvs;
  pubSub: typeof pubSub;

}

export const context: Context = {
  prisma,
  pubSub,
  users: DB.users,
  skills: DB.skills,
  cvs: DB.cvs,
  
};
