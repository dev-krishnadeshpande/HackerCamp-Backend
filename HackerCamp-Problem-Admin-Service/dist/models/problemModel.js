"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Problem = void 0;
const mongoose_1 = require("mongoose");
const problemSchema = new mongoose_1.Schema({
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
exports.Problem = (0, mongoose_1.model)("Problem", problemSchema);
