import {replaceRegex} from "../converter.js";

export function replaceTextStyling(content) {
    content = replaceRegex(content, /\*\*.*?\*\*/g, 2, -2, "\\textbf{", "}");
    content = replaceRegex(content, /\*.*?\*/g, 1, -1, "\\textit{", "}");
    content = replaceRegex(content, /__.*?__/g, 2, -2, "\\textbf{", "}");
    content = replaceRegex(content, /_.*?_/g, 1, -1, "\\textit{", "}");
    content = replaceRegex(content, /~~.*?~~/g, 2, -2, "\\underline{", "}");
    return content;
}