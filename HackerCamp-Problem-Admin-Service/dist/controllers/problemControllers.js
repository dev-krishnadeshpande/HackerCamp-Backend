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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.deleteOne = exports.deleteAll = exports.getOne = exports.getAll = exports.createProblem = void 0;
const ProblemRepository_1 = require("../repositories/ProblemRepository");
const ProblemService_1 = require("../services/ProblemService");
const problemService = new ProblemService_1.ProblemService(new ProblemRepository_1.ProblemRepository());
const createProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProblem = yield problemService.createProblem(req.body);
    return res.status(200).json({
        success: true,
        message: "Successfully created a new problem",
        error: "",
        data: newProblem,
    });
});
exports.createProblem = createProblem;
const getAll = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problems = yield problemService.getAll();
    return res.status(200).json({
        success: true,
        message: "Successfully fetched all problems",
        error: "",
        data: problems,
    });
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const problem = yield problemService.getOne((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    return res.status(200).json({
        success: true,
        message: "Successfully fetched the problem with given id",
        error: "",
        data: problem,
    });
});
exports.getOne = getOne;
const deleteAll = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield problemService.deleteAll();
    return res.status(200).json({
        success: true,
        message: `Successfully deleted ${response.deletedCount} problems`,
        error: "",
        data: {},
    });
});
exports.deleteAll = deleteAll;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield problemService.deleteOne(req.params.id);
    return res.status(200).json({
        success: true,
        message: "Successfully deleted the problem with given id",
        error: "",
        data: { deleteCount: response.deletedCount },
    });
});
exports.deleteOne = deleteOne;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProblem = yield problemService.updateOne(req.params.id, req.body);
    return res.status(200).json({
        success: true,
        message: "Successfully updated the problem with given id",
        error: "",
        data: { updatedProblem },
    });
});
exports.update = update;
