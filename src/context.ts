import { users, skills, cvs } from "./data";

export interface Context {
  users: typeof users;
  skills: typeof skills;
  cvs: typeof cvs;
}

export const context: Context = {
  users,
  skills,
  cvs,
};
