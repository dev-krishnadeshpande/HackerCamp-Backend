"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SampleJob {
    constructor(payload) {
        this.handle = () => {
            // console.log("hanlder");
            // console.log(this.payload);
        };
        this.failed = (job) => {
            console.log("failed handler", job === null || job === void 0 ? void 0 : job.id);
        };
        this.payload = payload;
        this.name = this.constructor.name;
    }
}
exports.default = SampleJob;
