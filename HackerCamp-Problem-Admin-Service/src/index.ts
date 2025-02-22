import bodyParser from "body-parser";
import express, { Express } from "express";

import ConnectToDB from "./config/dbConfig";
import { PORT } from "./config/serverConfig";
import apiRouter from "./routes";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.text());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server started at *:${PORT}`);
  try {
    ConnectToDB();
    console.log("Successfully connected to the db");
  } catch (err) {
    console.error("Error connecting to the db", err);
  }
});
