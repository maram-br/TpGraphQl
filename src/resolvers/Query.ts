import { Context } from "../context";

export const Query = {
    //resolver pour recuperer tous les cvs 
  cvs: (_parent: any, _args: any, { cvs }: Context) => cvs,
  
    // resolver pour recuperer un cv via son id 
  cv: (_parent: any, { id }: { id: string }, { cvs }: Context) =>
    cvs.find(cv => cv.id === +id),

};
