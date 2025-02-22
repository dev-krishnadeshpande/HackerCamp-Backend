import mongoose from "mongoose";

import { IProblem } from "../interfaces/ProblemInterface";
import { Problem } from "../models/problemModel";

export class ProblemRepository {
  async createProblem(problemData: IProblem) {
    try {
      const {
        title,
        description,
        difficulty,
        testCases,
        codeStubs,
        editorial,
      } = problemData;
      const problem = await Problem.create({
        title,
        description,
        difficulty,
        testCases,
        codeStubs,
        editorial,
      });

      return problem;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const problems = await Problem.find({});

      return problems;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string) {
    try {
      const problem = await Problem.findById(id);

      return problem;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      const res = await Problem.deleteMany();

      return res;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    try {
      const res = await Problem.deleteOne({ _id: objectId });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id: string, updates: Partial<IProblem>) {
    try {
      const updatedProblem = Problem.findByIdAndUpdate(id, updates, {
        returnDocument: "after",
      });
      return updatedProblem;
    } catch (error) {
      throw error;
    }
  }
}
