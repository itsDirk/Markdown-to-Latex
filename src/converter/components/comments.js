import {replaceRegex} from "../utils.js";

export function replaceComments(content) {
    // Comments in Obsidian
    content = replaceRegex(content, /\\%\\%.*?\\%\\%/gs, 4, -4, "%", "", "\n", "\n%");
    // Comments in Visual Studio Code
    content = replaceRegex(content, /<!-- ?.*? ?-->/gs, 4, -3, "%", "", "\n", "\n%");
    // Comments in JetBrains IDE's
    content = replaceRegex(content, /(?<=\n([\t ]*)|%.*)\n\[\/\/]: # \(.*?\)/g, 10, -1, "\n%", "");
    return content
}