import { Request, Response } from "express";

import { ProblemRepository } from "../repositories/ProblemRepository";
import { ProblemService } from "../services/ProblemService";

const problemService = new ProblemService(new ProblemRepository());

export const createProblem = async (req: Request, res: Response) => {
  const newProblem = await problemService.createProblem(req.body);
  return res.status(200).json({
    success: true,
    message: "Successfully created a new problem",
    error: "",
    data: newProblem,
  });
};

export const getAll = async (_: Request, res: Response) => {
  const problems = await problemService.getAll();
  return res.status(200).json({
    success: true,
    message: "Successfully fetched all problems",
    error: "",
    data: problems,
  });
};

export const getOne = async (req: Request, res: Response) => {
  const problem = await problemService.getOne(req?.params?.id);
  return res.status(200).json({
    success: true,
    message: "Successfully fetched the problem with given id",
    error: "",
    data: problem,
  });
};

export const deleteAll = async (_: Request, res: Response) => {
  const response = await problemService.deleteAll();
  return res.status(200).json({
    success: true,
    message: `Successfully deleted ${response.deletedCount} problems`,
    error: "",
    data: {},
  });
};

export const deleteOne = async (req: Request, res: Response) => {
  const response = await problemService.deleteOne(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Successfully deleted the problem with given id",
    error: "",
    data: { deleteCount: response.deletedCount },
  });
};

export const update = async (req: Request, res: Response) => {
  const updatedProblem = await problemService.updateOne(
    req.params.id,
    req.body
  );
  return res.status(200).json({
    success: true,
    message: "Successfully updated the problem with given id",
    error: "",
    data: { updatedProblem },
  });
};
