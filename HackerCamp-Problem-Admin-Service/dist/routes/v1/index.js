"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pingController_1 = require("../../controllers/pingController");
const problemControllers_1 = require("../../controllers/problemControllers");
const v1Router = express_1.default.Router();
v1Router.get("/ping", pingController_1.pingCheck);
v1Router.get("/problems", problemControllers_1.getAll);
v1Router.get("/problems/:id", problemControllers_1.getOne);
v1Router.post("/problems", problemControllers_1.createProblem);
v1Router.delete("/problems", problemControllers_1.deleteAll);
v1Router.delete("/problems/:id", problemControllers_1.deleteOne);
v1Router.patch("/problems/:id", problemControllers_1.update);
v1Router.get("/problems");
exports.default = v1Router;
