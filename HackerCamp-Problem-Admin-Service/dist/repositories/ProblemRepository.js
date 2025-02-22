"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const problemModel_1 = require("../models/problemModel");
class ProblemRepository {
    createProblem(problemData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, difficulty, testCases, codeStubs, editorial, } = problemData;
                const problem = yield problemModel_1.Problem.create({
                    title,
                    description,
                    difficulty,
                    testCases,
                    codeStubs,
                    editorial,
                });
                return problem;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const problems = yield problemModel_1.Problem.find({});
                return problems;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const problem = yield problemModel_1.Problem.findById(id);
                return problem;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield problemModel_1.Problem.deleteMany();
                return res;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.default.Types.ObjectId(id);
            try {
                const res = yield problemModel_1.Problem.deleteOne({ _id: objectId });
                return res;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateOne(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProblem = problemModel_1.Problem.findByIdAndUpdate(id, updates, {
                    returnDocument: "after",
                });
                return updatedProblem;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ProblemRepository = ProblemRepository;
