import { Context } from "../context";

export const Cv = {
    //resolver pour recupere le user d'un cv 
  user: (cv: any, _args: any, { users }: Context) =>
    users.find(u => u.id === cv.userId),
  
  //resolver pour recuperer les skills d'un cv 
  skills: (cv: any, _args: any, { skills }: Context) =>
    skills.filter(s => cv.skillIds.includes(s.id)),
};
