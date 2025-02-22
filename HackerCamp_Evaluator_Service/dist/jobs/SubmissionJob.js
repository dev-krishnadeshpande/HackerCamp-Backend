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
const cppExecutor_1 = __importDefault(require("../containers/cppExecutor"));
const javascriptExecutor_1 = __importDefault(require("../containers/javascriptExecutor"));
const evaluationQueueProducer_1 = __importDefault(require("../producers/evaluationQueueProducer"));
const constants_1 = require("../utils/constants");
const formatInputTestcaseString_1 = __importDefault(require("../utils/formatInputTestcaseString"));
class SubmissionJob {
    constructor(payload) {
        this.handle = () => __awaiter(this, void 0, void 0, function* () {
            if (this.payload) {
                const key = Object.keys(this.payload)[0];
                const { submissionId, userId, language: codeLanguage, code, testCases, } = this.payload[key];
                //Test cases
                const responses = testCases.map((testCase) => __awaiter(this, void 0, void 0, function* () {
                    const testCaseId = testCase.testCaseId;
                    const inputTestCase = testCase.input;
                    const outputTestCase = testCase.output;
                    const formattedInputTestCase = (0, formatInputTestcaseString_1.default)(inputTestCase);
                    if ((codeLanguage === null || codeLanguage === void 0 ? void 0 : codeLanguage.toLowerCase()) ===
                        constants_1.CODE_LANGUAGE_JAVASCRIPT.toLowerCase()) {
                        return (0, javascriptExecutor_1.default)(code, testCaseId, formattedInputTestCase, outputTestCase);
                    }
                    else if ((codeLanguage === null || codeLanguage === void 0 ? void 0 : codeLanguage.toLowerCase()) === constants_1.CODE_LANGUAGE_CPP.toLowerCase()) {
                        //TODO: Add changes for cppExecutor
                        return yield (0, cppExecutor_1.default)(code, formattedInputTestCase, outputTestCase);
                    }
                }));
                const responsesArr = yield Promise.all(responses);
                console.log(responsesArr);
                (0, evaluationQueueProducer_1.default)({ response: responsesArr, submissionId, userId });
            }
        });
        this.failed = (job) => {
            console.error("Job failed, Id: ", job === null || job === void 0 ? void 0 : job.id);
        };
        this.payload = payload;
        this.name = this.constructor.name;
    }
}
exports.default = SubmissionJob;
