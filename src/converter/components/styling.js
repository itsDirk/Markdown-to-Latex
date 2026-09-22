import {replaceRegex} from "../utils.js";

export function replaceTextStyling(content) {
    // Bold text (may not start/end with a space)
    content = replaceRegex(content, /\*\*(?! ).*?(?<! )\*\*/g, 2, -2, "\\textbf{", "}");
    // Italic text
    content = replaceRegex(content, /\*(?! ).*?(?<! )\*/g, 1, -1, "\\textit{", "}");
    // Bold text
    content = replaceRegex(content, /__(?! ).*?(?<! )__/g, 2, -2, "\\textbf{", "}");
    // Italic text
    content = replaceRegex(content, /_(?! ).*?(?<! )_/g, 1, -1, "\\textit{", "}");
    // Strikethrough text
    content = replaceRegex(content, /~~(?! ).*?(?<! )~~/g, 2, -2, "\\st{", "}");
    // Highlighted text (may include trailing space)
    content = replaceRegex(content, /==(?! ).*?==/g, 2, -2, "\\hl{", "}");
    return content;
}