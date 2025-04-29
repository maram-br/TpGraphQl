import { Context } from "../context";

export const Mutation = {
  createCv: async (_parent: any, { input }: any, { prisma, pubSub }: Context) => {

    const user = await prisma.user.findUnique({
      where: { id: input.userId }
    });
    
    if (!user) throw new Error(`User with id ${input.userId} not found`);

    
    if (input.skillIds && input.skillIds.length > 0) {
      
      const skills = await prisma.skill.findMany({
        where: {
          id: { in: input.skillIds }
        }
      });
      
      if (skills.length !== input.skillIds.length) {
        throw new Error("One or more skills not found");
      }
    }


    const newCv = await prisma.cv.create({
      data: {
        name: input.name,
        age: input.age,
        job: input.job,
        user: {
          connect: { id: input.userId }
        },
        skills: {
          create: input.skillIds?.map((skillId: number) => ({
            skill: {
              connect: { id: skillId }
            }
          })) || []
        }
      },
      include: {
        user: true,
        skills: {
          include: {
            skill: true
          }
        }
      }
    });

    
    await pubSub.publish("CV_ADDED", { cvAdded: newCv });
    
    return newCv;
  },

  updateCv: async (_parent: any, { input }: any, { prisma, pubSub }: Context) => {
    
    const existingCv = await prisma.cv.findUnique({
      where: { id: input.id }
    });
    
    if (!existingCv) throw new Error(`CV with id ${input.id} not found`);

    
    if (input.userId) {
      const user = await prisma.user.findUnique({
        where: { id: input.userId }
      });
      
      if (!user) throw new Error(`User with id ${input.userId} not found`);
    }

    
    const updateData: any = {};
    
    if (input.name !== undefined) updateData.name = input.name;
    if (input.age !== undefined) updateData.age = input.age;
    if (input.job !== undefined) updateData.job = input.job;
    
    if (input.userId !== undefined) {
      updateData.user = {
        connect: { id: input.userId }
      };
    }

     
    if (input.skillIds !== undefined) {
      
      if (input.skillIds.length > 0) {
        const skills = await prisma.skill.findMany({
          where: {
            id: { in: input.skillIds }
          }
        });
        
        if (skills.length !== input.skillIds.length) {
          throw new Error("One or more skills not found");
        }
      }
      
      
      await prisma.cvSkill.deleteMany({
        where: {
          cvId: input.id
        }
      });
      
      
      if (input.skillIds.length > 0) {
        updateData.skills = {
          create: input.skillIds.map((skillId: number) => ({
            skill: {
              connect: { id: skillId }
            }
          }))
        };
      }
    }

    
    const updatedCv = await prisma.cv.update({
      where: { id: input.id },
      data: updateData,
      include: {
        user: true,
        skills: {
          include: {
            skill: true
          }
        }
      }
    });

    
    await pubSub.publish("CV_UPDATED", { cvUpdated: updatedCv });
    
    return updatedCv;
  },

  removeCv: async (_parent: any, { id }: { id: number }, { prisma, pubSub }: Context) => {
    
    const cv = await prisma.cv.findUnique({
      where: { id },
      include: {
        user: true,
        skills: {
          include: {
            skill: true
          }
        }
      }
    });
    
    if (!cv) throw new Error(`CV with id ${id} not found`);

    
    await prisma.cvSkill.deleteMany({
      where: {
        cvId: id
      }
    });

    
    await prisma.cv.delete({
      where: { id }
    });

    
    await pubSub.publish("CV_DELETED", { cvDeleted: cv });
    
    return true;
  }
};

/*to test 
mutation {
  createCv(input: {
    name: "GraphQL Expert",
    age: 30,
    job: "Engineer",
    userId: 1,
    skillIds: [1, 2]
  }) {
    id
    name
  }
}
*/