import { model, Schema } from "mongoose";

import { IProblem } from "../interfaces/ProblemInterface";

const problemSchema = new Schema<IProblem>({
  title: {
    type: String,
    required: [true, "Title cannot be empty"],
  },
  description: {
    type: String,
    required: [true, "Description cannot be empty"],
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: [true, "Difficulty cannot be empty"],
    default: "easy",
  },
  testCases: {
    type: [
      {
        testCaseId: {
          type: String,
          required: true,
        },
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
      },
    ],
  },
  codeStubs: {
    type: [
      {
        language: {
          type: String,
          enum: ["JAVASCRIPT"],
          required: true,
        },
        startSnippet: {
          type: String,
        },
        endSnippet: {
          type: String,
        },
        userSnippet: {
          type: String,
        },
      },
    ],
  },
  editorial: {
    type: String,
  },
});

export const Problem = model<IProblem>("Problem", problemSchema);
