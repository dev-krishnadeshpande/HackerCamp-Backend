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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Docker = require("dockerode");
// import Docker from "dockerode";
const docker = new Docker();
function runJavaScriptCode(jsCode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create the container
            const container = yield docker.createContainer({
                Image: "node", // Use the Node.js image
                AttachStdin: false,
                AttachStdout: true,
                AttachStderr: true,
                Tty: false,
                Cmd: ["node", "-e", jsCode], // Pass the JavaScript code to Node.js
            });
            // Start the container
            yield container.start();
            // Attach to the container's output
            const logsStream = yield container.logs({
                follow: true,
                stdout: true,
                stderr: true,
            });
            return new Promise((resolve, reject) => {
                let output = "";
                // Capture the logs from the container
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                logsStream.on("data", (chunk) => {
                    // Docker log stream metadata is the first 8 bytes
                    const cleanChunk = chunk.slice(8).toString(); // Remove metadata
                    output += cleanChunk;
                });
                logsStream.on("end", () => __awaiter(this, void 0, void 0, function* () {
                    // Clean up the container
                    yield container.remove();
                    resolve(output.trim());
                }));
                logsStream.on("error", (err) => __awaiter(this, void 0, void 0, function* () {
                    console.log("err", err);
                    const cleanError = err.message.slice(8).toString();
                    yield container.remove();
                    reject(cleanError.trim());
                }));
            });
        }
        catch (err) {
            console.error("Error:", err);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const jsCode = `console.log(1 + 1;`;
    const output = yield runJavaScriptCode(jsCode);
    console.log(`Output from container:${output}`);
}))();
