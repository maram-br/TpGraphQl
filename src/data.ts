
export interface User {
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  }
  
  export interface Skill {
    id: number;
    designation: string;
  }
  
  export interface CvRaw {
    id: number;
    name: string;
    age: number;
    job: string;
    userId: number;       
    skillIds: number[];   
  }
  
  export const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "ADMIN" },
    { id: 2, name: "Bob",   email: "bob@example.com",   role: "USER"  },
  ];
  
  export const skills: Skill[] = [
    { id: 1, designation: "GraphQL"   },
    { id: 2, designation: "TypeScript"},
    { id: 3, designation: "React"     },
  ];
  
  export const cvs: CvRaw[] = [
    { id: 1, name: "Alice CV", age: 30, job: "Fullstack Dev", userId: 1, skillIds: [1,2] },
    { id: 2, name: "Bob CV",   age: 25, job: "Frontend Dev",  userId: 2, skillIds: [3]   },
  ];
  