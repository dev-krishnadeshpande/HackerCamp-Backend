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
const express_1 = __importDefault(require("express"));
const bullboardConfig_1 = __importDefault(require("./config/bullboardConfig"));
const serverConfig_1 = __importDefault(require("./config/serverConfig"));
const routes_1 = __importDefault(require("./routes"));
const constants_1 = require("./utils/constants");
const submissionWorker_1 = __importDefault(require("./worker/submissionWorker"));
const app = (0, express_1.default)();
app.use("/api", routes_1.default);
app.use("/admin/queues", bullboardConfig_1.default.getRouter());
app.listen(serverConfig_1.default.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, submissionWorker_1.default)(constants_1.SUBMISSION_QUEUE);
        console.log(`Server started at *: ${serverConfig_1.default.PORT}`);
    }
    catch (error) {
        console.error(error);
    }
}));
