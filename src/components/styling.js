import {replaceRegex} from "../converter.js";

export function replaceTextStyling(content) {
    // Bold text
    content = replaceRegex(content, /\*\*.*?\*\*/g, 2, -2, "\\textbf{", "}");
    // Italic text
    content = replaceRegex(content, /\*.*?\*/g, 1, -1, "\\textit{", "}");
    // Bold text
    content = replaceRegex(content, /__.*?__/g, 2, -2, "\\textbf{", "}");
    // Italic text
    content = replaceRegex(content, /_.*?_/g, 1, -1, "\\textit{", "}");
    // Strikethrough text (replaced with underlined text)
    content = replaceRegex(content, /~~.*?~~/g, 2, -2, "\\underline{", "}");
    return content;
}