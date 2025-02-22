import { IProblem } from "../interfaces/ProblemInterface";
import { ProblemRepository } from "../repositories/ProblemRepository";
import sanitizeMarkdown from "../utils/sanitizeMarkdown";

export class ProblemService {
  problemRepository: ProblemRepository;
  constructor(problemRepository: ProblemRepository) {
    this.problemRepository = problemRepository;
  }

  async createProblem(problemData: IProblem) {
    // Sanitize the markdown for description
    problemData.description = await sanitizeMarkdown(problemData.description);

    const problem = await this.problemRepository.createProblem(problemData);

    return problem;
  }

  async getAll() {
    const problems = await this.problemRepository.getAll();

    return problems;
  }

  async getOne(id: string) {
    const problem = await this.problemRepository.getOne(id);

    return problem;
  }

  async deleteAll() {
    const res = await this.problemRepository.deleteAll();
    return res;
  }

  async deleteOne(id: string) {
    const res = await this.problemRepository.deleteOne(id);
    return res;
  }

  async updateOne(id: string, updates: Partial<IProblem>) {
    try {
      const updatedProblem = await this.problemRepository.updateOne(
        id,
        updates
      );
      return updatedProblem;
    } catch (error) {
      throw error;
    }
  }
}
