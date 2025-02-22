"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const redisConfig_1 = __importDefault(require("../config/redisConfig"));
const constants_1 = require("../utils/constants");
exports.default = new bullmq_1.Queue(constants_1.EVALUATION_QUEUE, { connection: redisConfig_1.default });
