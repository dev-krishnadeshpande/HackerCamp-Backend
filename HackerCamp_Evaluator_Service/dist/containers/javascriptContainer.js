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
const containerHelper_1 = require("./containerHelper");
function runJavaScriptCode(jsCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const containerOptions = {
            Image: "node",
            AttachStdin: false,
            AttachStdout: true,
            AttachStderr: true,
            Tty: false,
            Cmd: ["node", "-e", jsCode],
        };
        const container = yield (0, containerHelper_1.createContainer)(containerOptions);
        yield container.start();
        // Attach to the container's output
        const logStream = yield container.logs({
            follow: true,
            stdout: true,
            stderr: true,
        });
        try {
            const codeResponse = yield (0, containerHelper_1.getDecodedStream)(logStream);
            console.log("codeResponse", codeResponse);
            return { output: codeResponse, status: "COMPLETED" };
        }
        catch (error) {
            return { output: error, status: "ERROR" };
        }
        finally {
            yield container.remove();
        }
    });
}
exports.default = runJavaScriptCode;
