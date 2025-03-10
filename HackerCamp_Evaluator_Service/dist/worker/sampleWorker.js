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
const bullmq_1 = require("bullmq");
const redisConfig_1 = __importDefault(require("../config/redisConfig"));
const SampleJob_1 = __importDefault(require("../jobs/SampleJob"));
function SampleWorker(queueName) {
    new bullmq_1.Worker(queueName, (job) => __awaiter(this, void 0, void 0, function* () {
        if (job.name === "SampleJob") {
            const sampleJob = new SampleJob_1.default(job.data);
            // console.log(job?.data, job?.name, job?.id);
            sampleJob.handle();
        }
        else if (job.name === "SubmissionJob") {
            console.log("SubmissionJob");
            const sampleJob = new SampleJob_1.default(job.data);
            console.log(job === null || job === void 0 ? void 0 : job.data, job === null || job === void 0 ? void 0 : job.name, job === null || job === void 0 ? void 0 : job.id);
            sampleJob.handle();
        }
        return true;
    }), { connection: redisConfig_1.default });
}
exports.default = SampleWorker;
