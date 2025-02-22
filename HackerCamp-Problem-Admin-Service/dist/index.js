"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const serverConfig_1 = require("./config/serverConfig");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.text());
app.use("/api", routes_1.default);
app.listen(serverConfig_1.PORT, () => {
    console.log(`Server started at *:${serverConfig_1.PORT}`);
    try {
        (0, dbConfig_1.default)();
        console.log("Successfully connected to the db");
    }
    catch (err) {
        console.error("Error connecting to the db", err);
    }
});
