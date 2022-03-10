import { Query } from "mysql2";
import { QueryOptionsTransactionRequired, where } from "sequelize/types";
import { mentor } from "../models/mentor.model";

class mentorService {
    /**
     * 
     * @param input as request body from the express application
     * @returns object after create the entry in database
     */
    async buildMentor(input: any) {
        // const id = UUIDV4();
        try {
            const newEntry = await mentor.create(input);
            return newEntry.toJSON()
        } catch (error: any) {
            return error.message
        }
    };
    async findMentor(id: string) {
        try {
            const result = await mentor.findOne({ where: { id } });
            return result
        } catch (error: any) {
            return error.message
        }
    };
    async updateMentor(update: object, query: string) {
        try {
            const result = await mentor.update(update, { where: { id: query } });
            return result;
        } catch (error: any) {
            return error.message
        }
    };
    async destroyMentor(id: string) {
        try {
            const result = await mentor.destroy({ where: { id } });
            return result;
        } catch (error: any) {
            return error.message
        }
    }

}

export default new mentorService();