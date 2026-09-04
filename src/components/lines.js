import {replaceRegex} from "../converter.js";

export function replaceHorizontalLines(content) {
    content = replaceRegex(content, /(?:\n|^) *--- *(?:\n|$)/g, 999, 0, "\\par\\noindent\\rule{\\textwidth}{0.4pt}\n", "");
    return content;
}
