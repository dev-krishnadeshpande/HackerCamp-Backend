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
exports.getDecodedStream = exports.createContainer = void 0;
const dockerode_1 = __importDefault(require("dockerode"));
const constants_1 = require("../utils/constants");
const docker = new dockerode_1.default();
function createContainer(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const container = yield docker.createContainer(options);
        return container;
    });
}
exports.createContainer = createContainer;
function getDecodedStream(logStream) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawLogBuffer = [];
        return new Promise((res, rej) => {
            logStream.on("data", (chunk) => {
                rawLogBuffer.push(chunk);
            });
            logStream.on("end", () => {
                const completeBuffer = Buffer.concat(rawLogBuffer);
                const decodedStream = decodeDockerStream(completeBuffer);
                if (decodedStream.stderr) {
                    rej(decodedStream.stderr);
                }
                else {
                    res(decodedStream.stdout);
                }
            });
        });
    });
}
exports.getDecodedStream = getDecodedStream;
function decodeDockerStream(buffer) {
    let offset = 0; // This variable keeps track of the current position in the buffer while parsing
    // The output that will store the accumulated stdout and stderr output as strings
    const output = { stdout: "", stderr: "" };
    // Loop until offset reaches end of the buffer
    while (offset < buffer.length) {
        // channel is read from buffer and has value of type of stream
        const typeOfStream = buffer[offset];
        // This length variable hold the length of the value
        // We will read this variable on an offset of 4 bytes from the start of the chunk
        const length = buffer.readUint32BE(offset + 4);
        // as now we have read the header, we can move forward to the value of the chunk
        offset += constants_1.DOCKER_STREAM_HEADER_SIZE;
        if (typeOfStream === 1) {
            // stdout stream
            output.stdout += buffer.toString("utf-8", offset, offset + length);
        }
        else if (typeOfStream === 2) {
            // stderr stream
            output.stderr += buffer.toString("utf-8", offset, offset + length);
        }
        offset += length; // move offset to next chunk
    }
    return output;
}
