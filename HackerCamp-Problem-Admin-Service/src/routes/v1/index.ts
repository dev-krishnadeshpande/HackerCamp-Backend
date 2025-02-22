import express from "express";

import { pingCheck } from "../../controllers/pingController";
import {
  createProblem,
  deleteAll,
  deleteOne,
  getAll,
  getOne,
  update,
} from "../../controllers/problemControllers";

const v1Router = express.Router();

v1Router.get("/ping", pingCheck);

v1Router.get("/problems", getAll);
v1Router.get("/problems/:id", getOne);
v1Router.post("/problems", createProblem);
v1Router.delete("/problems", deleteAll);
v1Router.delete("/problems/:id", deleteOne);
v1Router.patch("/problems/:id", update);

v1Router.get("/problems");

export default v1Router;
