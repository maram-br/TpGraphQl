import { DB } from "./data";
import { createPubSub } from "graphql-yoga";

type Events = {
  CV_ADDED:  [{ cvAdded: any }];    
  CV_UPDATED:[{ cvUpdated: any }];
  CV_DELETED:[{ cvDeleted: any }];
};
export const pubSub = createPubSub<Events>();


export interface Context {
  users: typeof DB.users;
  skills: typeof DB.skills;
  cvs: typeof DB.cvs;
  pubSub: typeof pubSub;
}

export const context: Context = {
  users: DB.users,
  skills: DB.skills,
  cvs: DB.cvs,
  pubSub

};


