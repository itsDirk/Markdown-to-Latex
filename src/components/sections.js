import {replaceRegex} from "../converter.js";

export function replaceSections(content) {
    content = replaceRegex(content, /### .*?(?:\n|$)/g, 4, -1, "\\subsubsection{", "}\n", /(?<!\\)#/g, "\\\#");
    content = replaceRegex(content, /## .*?(?:\n|$)/g, 3, -1, "\\subsection{", "}\n", /(?<!\\)#/g, "\\\#");
    content = replaceRegex(content, /# .*?(?:\n|$)/g, 2, -1, "\\section{", "}\n", /(?<!\\)#/g, "\\\#");
    return content;
}