import * as fs from "fs";
import * as path from "path";
import { DB } from "../data";

import { pubSub } from "../context";


const saveDataToFile = () => {
    const dataPath = path.resolve(__dirname, "../data.ts");
    const fileContent = `
        export const DB = ${JSON.stringify(DB, null, 2)};
    `;

    fs.writeFileSync(dataPath, fileContent, { encoding: "utf-8" });
};

export const Mutation = {
    createCv: (_: any, { input }: any, {  }: {  }, info: any) => {
        const cvsLength = DB.cvs.length;
        input.id = cvsLength === 0 ? 1 : DB.cvs[cvsLength - 1].id + 1;

        const user = DB.users.find(u => u.id === input.userId);
        if (!user) throw new Error("User not found");

        if (input.skillIds) {
            input.skillIds.forEach((id: number) => {
                const skill = DB.skills.find(s => s.id === id);
                if (!skill) throw new Error(`Skill with id ${id} not found`);
            });
        }

        DB.cvs.push(input);

        saveDataToFile();

        pubSub.publish("CV_ADDED", { cvAdded: input }); 

        return input;
    },

    updateCv: (_: any, { input }: any, {  }: { }, info: any) => {
        const index = DB.cvs.findIndex(cv => cv.id === input.id);
        if (index === -1) throw new Error("CV not found");

        const updated = {
            ...DB.cvs[index],
            ...input,
        };

        if (input.userId) {
            const user = DB.users.find(u => u.id === input.userId);
            if (!user) throw new Error("User not found");
        }

        if (input.skillIds) {
            input.skillIds.forEach((id: number) => {
                const exists = DB.skills.some(s => s.id === id);
                if (!exists) throw new Error(`Skill with id ${id} not found`);
            });
        }

        DB.cvs[index] = updated;

        saveDataToFile();

        pubSub.publish("CV_UPDATED", { cvUpdated: updated }); 

        return updated;
    },

    removeCv: (_: any, { id }: { id: number }, {  }: { }) => {
        const index = DB.cvs.findIndex(cv => cv.id === id);
        if (index === -1) throw new Error("CV not found");

        const cv = DB.cvs[index];
        DB.cvs.splice(index, 1);

        saveDataToFile(); 
        pubSub.publish("CV_DELETED", { cvDeleted: cv }); 


        return true;
    },
};