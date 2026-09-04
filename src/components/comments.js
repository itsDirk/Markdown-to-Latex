import {replaceRegex} from "../converter.js";

export function replaceComments(content) {
    // Comments in Obsidian
    content = replaceRegex(content, /%%.*?%%/gs, 2, -2, "%", "\n", "\n%");
    // Comments in JetBrains IDE's
    content = replaceRegex(content, /\n\n\[\/\/]: # (.*?)/g, 10, -1, "\n\n%", "", "\n%");
    // Comments in Visual Studio Code
    content = replaceRegex(content, /<!-- ?.*? ?-->/gs, 4, -3, "%", "", "\n%");
    return content
}