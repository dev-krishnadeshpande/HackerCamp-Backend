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
const marked_1 = require("marked");
const TurndownService = require("turndown");
const sanitizeHtml = require("sanitize-html");
function sanitizeMarkdown(markDownString) {
    return __awaiter(this, void 0, void 0, function* () {
        const toHtml = yield marked_1.marked.parse(markDownString);
        //sanitize html
        const sanitizedHtml = sanitizeHtml(toHtml, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        });
        //html to markdown
        const turndownService = new TurndownService();
        const sanitizedMarkdown = turndownService.turndown(sanitizedHtml);
        return sanitizedMarkdown;
    });
}
exports.default = sanitizeMarkdown;
