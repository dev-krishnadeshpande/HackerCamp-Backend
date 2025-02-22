"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONNECTION = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT || 6060;
exports.DB_CONNECTION = process.env.DB_CONNECTION;
