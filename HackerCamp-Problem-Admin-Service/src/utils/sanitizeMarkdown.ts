import { marked } from "marked";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function require(name: string): any;
const TurndownService = require("turndown");
const sanitizeHtml = require("sanitize-html");

async function sanitizeMarkdown(markDownString: string): Promise<string> {
  const toHtml = await marked.parse(markDownString);

  //sanitize html
  const sanitizedHtml = sanitizeHtml(toHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
  });

  //html to markdown
  const turndownService = new TurndownService();
  const sanitizedMarkdown = turndownService.turndown(sanitizedHtml);

  return sanitizedMarkdown;
}

export default sanitizeMarkdown;
