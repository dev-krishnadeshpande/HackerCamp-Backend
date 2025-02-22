"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const evaluationQueue_1 = __importDefault(require("../queues/evaluationQueue"));
const submissionQueue_1 = __importDefault(require("../queues/submissionQueue"));
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
createBullBoard({
    queues: [
        new BullMQAdapter(submissionQueue_1.default),
        new BullMQAdapter(evaluationQueue_1.default),
    ],
    serverAdapter: serverAdapter,
});
exports.default = serverAdapter;
