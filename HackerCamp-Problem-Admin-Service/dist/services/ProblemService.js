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
exports.ProblemService = void 0;
const sanitizeMarkdown_1 = __importDefault(require("../utils/sanitizeMarkdown"));
class ProblemService {
    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }
    createProblem(problemData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Sanitize the markdown for description
            problemData.description = yield (0, sanitizeMarkdown_1.default)(problemData.description);
            const problem = yield this.problemRepository.createProblem(problemData);
            return problem;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const problems = yield this.problemRepository.getAll();
            return problems;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const problem = yield this.problemRepository.getOne(id);
            return problem;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.problemRepository.deleteAll();
            return res;
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.problemRepository.deleteOne(id);
            return res;
        });
    }
    updateOne(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProblem = yield this.problemRepository.updateOne(id, updates);
                return updatedProblem;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ProblemService = ProblemService;
