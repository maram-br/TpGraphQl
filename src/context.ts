import { DB } from "./data";

export interface Context {
  users: typeof DB.users;
  skills: typeof DB.skills;
  cvs: typeof DB.cvs;
}

export const context: Context = {
  users: DB.users,
  skills: DB.skills,
  cvs: DB.cvs,
};
