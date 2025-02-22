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
const tar_stream_1 = __importDefault(require("tar-stream"));
const containerHelper_1 = require("./containerHelper");
function runCppCode(cppCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const containerOptions = {
            Image: "gcc",
            AttachStdin: false,
            AttachStdout: true,
            AttachStderr: true,
            Tty: false,
            Cmd: ["tail", "-f", "/dev/null"],
            WorkingDir: "/workspace",
        };
        const container = yield (0, containerHelper_1.createContainer)(containerOptions);
        yield container.start();
        // Push the C++ code into the container
        // await pushCppCodeToContainer(container, cppCode);
        // Verify container is running
        const containerInfo = yield container.inspect();
        if (!containerInfo.State.Running) {
            console.error("Container is not running.");
            return;
        }
        // Create the directory in the container
        const exec = yield container.exec({
            Cmd: ["mkdir", "-p", "/workspace"],
            AttachStdout: true,
            AttachStderr: true,
        });
        yield exec.start({}); // Provide required options
        console.log("Directory created in container!");
        // Push the C++ code into the container
        yield pushCppCodeToContainer(container, cppCode);
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
            // await container.remove();
        }
    });
}
function pushCppCodeToContainer(container, cppCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const pack = tar_stream_1.default.pack(); // Create a tar archive in memory
        // Add program.cpp with the provided C++ code
        pack.entry({ name: "program.cpp" }, cppCode);
        pack.finalize();
        // // Ensure /workspace directory exists
        // const exec = await container.exec({
        //   Cmd: ["mkdir", "-p", "/workspace"],
        //   AttachStdout: true,
        //   AttachStderr: true,
        // });
        // const stream = await exec.start({ hijack: true, stdin: false }); // Provide required options
        // console.log(stream);
        // Push the archive to the container's working directory
        yield container.putArchive(pack, { path: "/workspace" });
        // Step 3: Compile the C++ code
        const compileExec = yield container.exec({
            Cmd: ["g++", "-o", "/workspace/program", "/workspace/program.cpp"],
            AttachStdout: true,
            AttachStderr: true,
        });
        const compileStream = yield compileExec.start({});
        compileStream.pipe(process.stdout);
        console.log("C++ code compiled.");
        // Step 4: Run the compiled program
        const runExec = yield container.exec({
            Cmd: ["/workspace/program"],
            AttachStdout: true,
            AttachStderr: true,
        });
        const runStream = yield runExec.start({});
        runStream.pipe(process.stdout);
        console.log("C++ program executed.");
    });
}
exports.default = runCppCode;
